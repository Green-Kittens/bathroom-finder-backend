import { clearDatabase } from "./setupMemoryDatabase";

beforeEach(async () => {
  await clearDatabase();
});
