import dotenv from 'dotenv';
import express from 'express';
import compression from 'compression';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-github';
import sessionFileStore from 'session-file-store';
import sapper from 'sapper';
import serve from 'serve-static';
import devalue from 'devalue';
import { Store } from 'svelte/store.js';
import { routes } from './manifest/server.js';

dotenv.config();

const FileStore = sessionFileStore(session);

passport.use(new Strategy({
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: `${process.env.BASEURL}/auth/callback`,
	userAgent: 'svelte.technology'
}, (accessToken, refreshToken, profile, callback) => {
	return callback(null, {
		token: accessToken,
		id: profile.id,
		username: profile.username,
		displayName: profile.displayName,
		photo: profile.photos && profile.photos[0] && profile.photos[0].value
	});
}));

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((obj, cb) => {
	cb(null, obj);
});

express()
	.use(compression({ threshold: 0 }))

	.use(session({
		secret: 'svelte',
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 31536000
		},
		store: new FileStore({
			path: process.env.NOW ? `/tmp/sessions` : `.sessions`
		})
	}))

	.use(passport.initialize())
	.use(passport.session())

	.get('/auth/login', (req, res, next) => {
		const { returnTo } = req.query;
		req.session.returnTo = returnTo ? decodeURIComponent(returnTo) : '/';
		next();
	}, passport.authenticate('github', { scope: ['gist', 'read:user'] }))

	.post('/auth/logout', (req, res) => {
		req.logout();
		res.end('ok');
	})

	.get('/auth/callback', passport.authenticate('github', { failureRedirect: '/auth/error' }), (req, res) => {
		const { id, username, displayName, photo } = req.session.passport && req.session.passport.user;

		res.end(`
			<script>
				window.parent.postMessage({
					user: ${devalue({ id, username, displayName, photo })}
				}, window.location.origin);
			</script>
		`);
	})

	.use(
		compression({ threshold: 0 }),
		serve('assets'),
		sapper({
			routes,
			store: req => {
				const user = req.session.passport && req.session.passport.user;

				return new Store({
					user: user && {
						// strip access token
						id: user.id,
						name: user.name,
						displayName: user.displayName,
						photo: user.photo
					},
					guide_contents: []
				});
			}
		})
	)

	.listen(process.env.PORT);