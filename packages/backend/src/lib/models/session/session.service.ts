import { Session } from "./session.model";

async function createSession(sessionId: string, adminId: string) {
  const insertedSessionDoc = await Session.insertMany({
    sessionId,
    adminId,
    createdAt: new Date(),
  });
  return insertedSessionDoc;
}

async function deleteSession(sessionId: string, adminId: string) {
  const sessDoc = await Session.findOneAndDelete({ sessionId, adminId });
  return sessDoc !== null;
}

async function validateSession(sessionId: string, adminId: string) {
  const sessDoc = await Session.findOne({ sessionId, adminId });
  return sessDoc !== null;
}

export { createSession, deleteSession, validateSession };
