-- Lock down direct client writes; all writes go through trusted server functions (service role).
REVOKE ALL ON public.abandoned_carts FROM anon;
REVOKE ALL ON public.abandoned_carts FROM authenticated;
GRANT SELECT ON public.abandoned_carts TO authenticated;
GRANT ALL ON public.abandoned_carts TO service_role;

REVOKE ALL ON public.orders FROM anon;
REVOKE ALL ON public.orders FROM authenticated;
GRANT SELECT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

REVOKE ALL ON public.user_roles FROM anon;
REVOKE ALL ON public.user_roles FROM authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
