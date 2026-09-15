CREATE TABLE "buyer_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid NOT NULL,
	"buyer_slug" text NOT NULL,
	"stage" text NOT NULL,
	"outcome" text NOT NULL,
	"price" numeric(10, 2),
	"external_id" text,
	"reason" text,
	"request" jsonb,
	"response" jsonb,
	"latency_ms" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "buyers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"kind" text NOT NULL,
	"adapter" text NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"vertical_slugs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "buyers_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "calls" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tracking_number" text NOT NULL,
	"buyer_slug" text NOT NULL,
	"vertical_slug" text NOT NULL,
	"market_slug" text,
	"caller_hash" text,
	"duration_seconds" integer,
	"billable" boolean,
	"payout" numeric(10, 2),
	"external_id" text,
	"visit_id" uuid,
	"raw" jsonb,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consent_texts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" text NOT NULL,
	"vertical_slug" text NOT NULL,
	"body" text NOT NULL,
	"partner_list_version" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "consent_texts_version_unique" UNIQUE("version")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visit_id" uuid,
	"name" text NOT NULL,
	"props" jsonb,
	"path" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visit_id" uuid,
	"vertical_slug" text NOT NULL,
	"market_slug" text,
	"status" text DEFAULT 'new' NOT NULL,
	"status_reason" text,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"address" text,
	"city" text,
	"state" text,
	"zip" text NOT NULL,
	"homeowner" boolean NOT NULL,
	"timeline" text NOT NULL,
	"answers" jsonb NOT NULL,
	"quality_score" integer DEFAULT 0 NOT NULL,
	"dedupe_hash" text NOT NULL,
	"fraud_flags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"consent_text_version" text NOT NULL,
	"partner_list_version" text NOT NULL,
	"consented_at" timestamp with time zone NOT NULL,
	"trustedform_cert_url" text,
	"jornaya_lead_id" text,
	"ip" text NOT NULL,
	"user_agent" text NOT NULL,
	"page_url" text NOT NULL,
	"form_version" text NOT NULL,
	"session_seconds" integer,
	"channel" text DEFAULT 'direct' NOT NULL,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"sold_to_buyer_slug" text,
	"sale_price" numeric(10, 2),
	"revenue" numeric(10, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "market_zips" (
	"market_id" uuid NOT NULL,
	"zip" text NOT NULL,
	"city" text
);
--> statement-breakpoint
CREATE TABLE "markets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"state" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "markets_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "partner_lists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" text NOT NULL,
	"partners" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "partner_lists_version_unique" UNIQUE("version")
);
--> statement-breakpoint
CREATE TABLE "sales" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid,
	"call_id" uuid,
	"buyer_slug" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"external_id" text,
	"return_reason" text,
	"returned_at" timestamp with time zone,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tracking_numbers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"e164" text NOT NULL,
	"display" text NOT NULL,
	"buyer_slug" text NOT NULL,
	"vertical_slug" text NOT NULL,
	"market_slug" text,
	"channel" text,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "tracking_numbers_e164_unique" UNIQUE("e164")
);
--> statement-breakpoint
CREATE TABLE "verticals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "verticals_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "visits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_url" text NOT NULL,
	"referrer" text,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"utm_term" text,
	"utm_content" text,
	"gclid" text,
	"channel" text DEFAULT 'direct' NOT NULL,
	"device" text,
	"ip_hash" text,
	"user_agent" text,
	"vertical_slug" text,
	"market_slug" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "webhook_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source" text NOT NULL,
	"payload" jsonb NOT NULL,
	"processed" boolean DEFAULT false NOT NULL,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "buyer_attempts" ADD CONSTRAINT "buyer_attempts_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calls" ADD CONSTRAINT "calls_visit_id_visits_id_fk" FOREIGN KEY ("visit_id") REFERENCES "public"."visits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_visit_id_visits_id_fk" FOREIGN KEY ("visit_id") REFERENCES "public"."visits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_visit_id_visits_id_fk" FOREIGN KEY ("visit_id") REFERENCES "public"."visits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "market_zips" ADD CONSTRAINT "market_zips_market_id_markets_id_fk" FOREIGN KEY ("market_id") REFERENCES "public"."markets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "buyer_attempts_lead_idx" ON "buyer_attempts" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "calls_started_idx" ON "calls" USING btree ("started_at");--> statement-breakpoint
CREATE INDEX "events_visit_idx" ON "events" USING btree ("visit_id");--> statement-breakpoint
CREATE INDEX "events_name_idx" ON "events" USING btree ("name");--> statement-breakpoint
CREATE INDEX "leads_created_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "leads_dedupe_idx" ON "leads" USING btree ("dedupe_hash");--> statement-breakpoint
CREATE INDEX "leads_vertical_market_idx" ON "leads" USING btree ("vertical_slug","market_slug");--> statement-breakpoint
CREATE UNIQUE INDEX "market_zips_zip_idx" ON "market_zips" USING btree ("zip");--> statement-breakpoint
CREATE INDEX "sales_lead_idx" ON "sales" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "sales_created_idx" ON "sales" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "visits_created_idx" ON "visits" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "visits_channel_idx" ON "visits" USING btree ("channel");