-- 1) Replace has_role() usage in policies with inline EXISTS checks so the
--    SECURITY DEFINER function no longer needs to be executable by clients.
DROP POLICY IF EXISTS "Admins can read orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can read order events" ON public.order_events;
DROP POLICY IF EXISTS "Admins can add order events" ON public.order_events;

CREATE POLICY "Admins can read orders" ON public.orders
FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

CREATE POLICY "Admins can update orders" ON public.orders
FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

CREATE POLICY "Admins can read order events" ON public.order_events
FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

CREATE POLICY "Admins can add order events" ON public.order_events
FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

-- 2) Make the SECURITY DEFINER helpers non-executable by client roles.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;

-- 3) Explicitly lock down writes: orders are created only by the trusted
--    server process, and roles are assigned only server-side.
REVOKE INSERT, DELETE ON public.orders FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;
REVOKE ALL ON public.orders FROM anon;
REVOKE ALL ON public.user_roles FROM anon;
REVOKE ALL ON public.order_events FROM anon;
GRANT SELECT, UPDATE ON public.orders TO authenticated;
GRANT SELECT, INSERT ON public.order_events TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.order_events TO service_role;
GRANT ALL ON public.user_roles TO service_role;