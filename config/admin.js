module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8017e77097a9b3864e7c54677cb608ba'),
  },
});
