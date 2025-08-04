-- Datos iniciales para ChatzIA
-- Ejecuta este script después de crear las tablas

-- Insertar planes predefinidos
INSERT INTO plans (name, price, chatbot_limit, message_limit, features) VALUES
('Básico', 0.00, 2, 100, '["Chat Web", "Soporte Básico"]'),
('Pro', 19.00, 10, 2000, '["Chat Web", "WhatsApp", "Telegram", "Soporte Prioritario", "Analytics"]'),
('Empresa', 99.00, -1, 50000, '["Todo incluido", "API Personalizada", "Soporte 24/7", "SLA Garantizado"]');

-- Insertar usuario de ejemplo (opcional, para testing)
-- INSERT INTO users (name, email, role, plan_id) VALUES
-- ('Usuario Demo', 'demo@chatzia.ai', 'registered', (SELECT id FROM plans WHERE name = 'Pro' LIMIT 1));
