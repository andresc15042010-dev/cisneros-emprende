-- Migración: Corrección de correo de administradora Cami
-- Fecha: 2026-09-15
-- Propósito: Actualizar el trigger handle_new_user para asignar rol admin al correo real andresc.15042010@gmail.com

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS 
DECLARE
  assigned_role public.user_role := 'user';
BEGIN
  IF NEW.email = 'andresc.15042010@gmail.com'
     OR NEW.raw_user_meta_data->>'is_admin' = 'true' THEN
    assigned_role := 'admin';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Vecino de Cisneros'),
    NEW.raw_user_meta_data->>'avatar_url',
    assigned_role
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    role = CASE 
      WHEN EXCLUDED.email = 'andresc.15042010@gmail.com' THEN 'admin'::public.user_role 
      ELSE profiles.role 
    END;

  RETURN NEW;
END;
 LANGUAGE plpgsql SECURITY DEFINER;

-- Actualizar perfil existente si ya fue registrado previamente con rol user
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'andresc.15042010@gmail.com';
