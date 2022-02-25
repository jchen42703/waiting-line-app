interface POSTCreateReq {
  adminId: string;
}

interface POSTCreateRes {
  queueId: string;
}

interface POSTJoinReq {
  queueId: string;
}

interface POSTJoinRes {
  userId: string;
}

interface POSTPopReq {
  queueId: string;
  userId: string;
}

interface POSTPopRes {
  userId: string;
  error: string;
}

interface GETProgressReq {
  queueId: string;
  userId: string;
}

interface GETProgressRes {
  error: string;
  queueId: string;
  userId: string;
  currPlace: number;
  total: number;
}

export {
  POSTCreateReq,
  POSTCreateRes,
  POSTJoinReq,
  POSTJoinRes,
  POSTPopReq,
  POSTPopRes,
  GETProgressReq,
  GETProgressRes,
};
