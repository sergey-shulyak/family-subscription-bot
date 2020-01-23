CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT uuid_generate_v4(),
  telegram_id INT NOT NULL UNIQUE,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR,
  username VARCHAR,
  PRIMARY KEY (id)
);

CREATE TYPE currency AS ENUM ('uah', 'usd', 'eur');

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  owner_id INT NOT NULL,
  owner_card VARCHAR NOT NULL,
  billing_date TIMESTAMP NOT NULL,
  price FLOAT NOT NULL,
  price_per_member FLOAT NOT NULL,
  currency currency NOT NULL,
  subscribers uuid[]
  PRIMARY KEY (id)
);

CREATE TYPE transaction_status AS ENUM('created', 'in_progress', 'successful', 'failed')

CREATE TABLE IF NOT EXISTS payments (
  id uuid DEFAULT uuid_generate_v4(),
  transaction_time TIMESTAMP,
  transaction_status transaction_status DEFAULT 'created',
  subscription_id uuid NOT NULL REFERENCES subsciptions(id),
  subscriber_id uuid NOT NULL REFERENCES users(id)
  PRIMARY KEY (id)
);