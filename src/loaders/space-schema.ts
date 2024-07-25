import { z } from "astro/zod";

// Auto-generated from the API documentation
const AgencySerializerMini = z
  .object({
    id: z.number().int(),
    url: z.string().url(),
    name: z.string().max(200),
    type: z.string(),
  })
  .passthrough();

const LaunchStatus = z
  .object({ id: z.number().int(), name: z.string() })
  .passthrough();

const LauncherConfigList = z
  .object({
    id: z.number().int(),
    launch_library_id: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .nullish(),
    url: z.string().url(),
    name: z.string().max(200),
    family: z.string(),
    full_name: z.string().max(200).optional(),
    variant: z.string().max(200).optional(),
  })
  .passthrough();

const RocketSerializerCommon = z
  .object({ id: z.number().int(), configuration: LauncherConfigList })
  .passthrough();

const Orbit = z
  .object({
    id: z.number().int(),
    name: z.string().max(50),
    abbrev: z.string().max(30),
  })
  .passthrough();

const Mission = z
  .object({
    id: z.number().int(),
    launch_library_id: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .nullish(),
    name: z.string().max(255),
    description: z.string().optional(),
    launch_designator: z.string().optional(),
    type: z.string(),
    orbit: Orbit,
  })
  .passthrough();

const Location = z
  .object({
    id: z.number().int(),
    url: z.string().url(),
    name: z.string().max(255).optional(),
    country_code: z.string(),
    map_image: z.string().url().nullish(),
    total_launch_count: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .nullish(),
    total_landing_count: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .nullish(),
  })
  .passthrough();

const Pad = z
  .object({
    id: z.number().int(),
    url: z.string().url(),
    agency_id: z.number().int(),
    name: z.string().max(255).optional(),
    info_url: z.string().max(200).url().nullish(),
    wiki_url: z.string().max(200).url().nullish(),
    map_url: z.string().max(200).url().nullish(),
    latitude: z.string(),
    longitude: z.string(),
    location: Location,
    map_image: z.string().url().nullish(),
    total_launch_count: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .nullish(),
  })
  .passthrough();

const Program = z
  .object({
    id: z.number().int(),
    url: z.string().url(),
    name: z.string().max(255),
    description: z.string().max(40000).nullish(),
    agencies: z.array(AgencySerializerMini),
    image_url: z.string(),
    start_date: z.string().datetime({ offset: true }).nullish(),
    end_date: z.string().datetime({ offset: true }).nullish(),
    info_url: z.string().max(200).url().nullish(),
    wiki_url: z.string().max(200).url().nullish(),
  })
  .passthrough();

const LaunchSerializerCommon = z
  .object({
    id: z.string().uuid(),
    url: z.string().url(),
    launch_library_id: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .nullish(),
    slug: z.string().regex(/^[-a-zA-Z0-9_]+$/),
    name: z.string().max(2048).optional(),
    status: LaunchStatus,
    net: z.string().datetime({ offset: true }).optional(),
    window_end: z.string().datetime({ offset: true }).optional(),
    window_start: z.string().datetime({ offset: true }).optional(),
    inhold: z.boolean(),
    tbdtime: z.boolean(),
    tbddate: z.boolean(),
    probability: z.number().int().gte(-2147483648).lte(2147483647).nullish(),
    holdreason: z.string().optional().default(""),
    failreason: z.string().max(2048).nullish(),
    hashtag: z.string().max(2048).nullish(),
    launch_service_provider: AgencySerializerMini,
    rocket: RocketSerializerCommon,
    mission: Mission,
    pad: Pad,
    webcast_live: z.boolean().optional(),
    image: z.string(),
    infographic: z.string(),
    program: z.array(Program),
  })
  .passthrough();
const PaginatedLaunchSerializerCommonList = z
  .object({
    count: z.number().int(),
    next: z.string().url().nullable(),
    previous: z.string().url().nullable(),
    results: z.array(LaunchSerializerCommon),
  })
  .partial()
  .passthrough();
export const schemas = {
  AgencySerializerMini,
  LaunchStatus,
  LauncherConfigList,
  RocketSerializerCommon,
  Orbit,
  Mission,
  Location,
  Pad,
  Program,
  LaunchSerializerCommon,
  PaginatedLaunchSerializerCommonList,
};
