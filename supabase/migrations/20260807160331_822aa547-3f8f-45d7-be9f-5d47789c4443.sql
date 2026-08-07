ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_claimed_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS payment_receipt_path TEXT,
  ADD COLUMN IF NOT EXISTS payment_claim_note TEXT;