-- 1. Orders: no client-side inserts. Only server-side (service role) may create orders.
REVOKE INSERT ON public.orders FROM anon, authenticated;
REVOKE UPDATE ON public.orders FROM anon;
GRANT SELECT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

DROP POLICY IF EXISTS "No client order inserts" ON public.orders;
CREATE POLICY "No client order inserts"
ON public.orders AS RESTRICTIVE FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- 2. Abandoned carts: writes only through server-side cart sync (service role).
REVOKE INSERT, UPDATE, DELETE ON public.abandoned_carts FROM anon, authenticated;
GRANT SELECT ON public.abandoned_carts TO authenticated;
GRANT ALL ON public.abandoned_carts TO service_role;

DROP POLICY IF EXISTS "No client cart writes" ON public.abandoned_carts;
CREATE POLICY "No client cart writes"
ON public.abandoned_carts AS RESTRICTIVE FOR INSERT
TO anon, authenticated
WITH CHECK (false);

DROP POLICY IF EXISTS "No client cart updates" ON public.abandoned_carts;
CREATE POLICY "No client cart updates"
ON public.abandoned_carts AS RESTRICTIVE FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- 3. Payment receipts storage: explicit policies so only admins can read, nobody can write from the client.
DROP POLICY IF EXISTS "Admins can read payment receipts" ON storage.objects;
CREATE POLICY "Admins can read payment receipts"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'payment-receipts'
  AND public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "No client writes to payment receipts" ON storage.objects;
CREATE POLICY "No client writes to payment receipts"
ON storage.objects AS RESTRICTIVE FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id <> 'payment-receipts');

DROP POLICY IF EXISTS "No client updates to payment receipts" ON storage.objects;
CREATE POLICY "No client updates to payment receipts"
ON storage.objects AS RESTRICTIVE FOR UPDATE
TO anon, authenticated
USING (bucket_id <> 'payment-receipts')
WITH CHECK (bucket_id <> 'payment-receipts');

DROP POLICY IF EXISTS "No client deletes of payment receipts" ON storage.objects;
CREATE POLICY "No client deletes of payment receipts"
ON storage.objects AS RESTRICTIVE FOR DELETE
TO anon, authenticated
USING (bucket_id <> 'payment-receipts');