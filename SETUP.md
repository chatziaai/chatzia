# Configuración de Autenticación - ChatzIA

## Problemas Identificados y Soluciones

### 1. Configuración de Variables de Entorno

Para que la autenticación funcione correctamente, necesitas configurar las variables de entorno de Supabase:

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Agrega las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

### 2. Configuración de Supabase

1. Ve a tu proyecto de Supabase
2. En Settings > API, copia:
   - Project URL
   - anon/public key

### 3. Base de Datos

Asegúrate de que las siguientes tablas existan en tu base de datos:

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'registered',
  plan_id UUID REFERENCES plans(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de planes
CREATE TABLE plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  chatbot_limit INTEGER DEFAULT 1,
  message_limit INTEGER DEFAULT 1000,
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de agentes
CREATE TABLE agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  sector TEXT,
  user_id UUID REFERENCES users(id),
  channels TEXT[],
  status TEXT DEFAULT 'inactive',
  personality TEXT,
  knowledge_base TEXT,
  welcome_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Problemas Comunes

#### Error: "No se puede acceder al dashboard después del login"

**Causas posibles:**
1. Variables de entorno no configuradas
2. Base de datos no configurada
3. Usuario no existe en la tabla `users`

**Soluciones:**
1. Verifica que `.env.local` esté configurado correctamente
2. Ejecuta los scripts SQL para crear las tablas
3. Asegúrate de que el usuario se cree en la tabla `users` al registrarse

#### Error: "Middleware no funciona"

**Solución:**
El middleware verifica las cookies de autenticación. Si no funciona, verifica:
1. Que las variables de entorno estén configuradas
2. Que Supabase esté funcionando correctamente
3. Que las cookies se estén guardando correctamente

### 5. Verificación

Para verificar que todo funciona:

1. Reinicia el servidor de desarrollo: `pnpm dev`
2. Ve a `/register` y crea una cuenta
3. Inicia sesión en `/login`
4. Deberías ser redirigido automáticamente al dashboard

### 6. Logs de Depuración

Si sigues teniendo problemas, revisa la consola del navegador para ver errores específicos de autenticación. 