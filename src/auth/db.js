import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

const storage = createStorage({ driver: fsLiteDriver({ base: "./.data" }) });

export async function createUser(data) {
  const users = (await storage.getItem("users:data")) ?? [];
  const counter = (await storage.getItem("users:counter")) ?? 1;
  const user = { id: counter, ...data };
  await Promise.all([
    storage.setItem("users:data", [...users, user]),
    storage.setItem("users:counter", counter + 1),
  ]);
  return user;
}

export async function findUser({ email, id }) {
  const users = (await storage.getItem("users:data")) ?? [];
  if (id) return users.find((u) => u.id === id);
  if (email) return users.find((u) => u.email === email);
  return undefined;
}
