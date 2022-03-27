interface POSTCreateRes {
  queueId: string;
}

interface POSTJoinReq {
  queueId: string;
  name: string;
  email: string;
  phoneNumber: string;
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
}

interface GETProgressReq {
  queueId: string;
  userId: string;
}

interface GETProgressRes {
  queueId: string;
  userId: string;
  currPlace: number;
  total: number;
}

export {
  POSTCreateRes,
  POSTJoinReq,
  POSTJoinRes,
  POSTPopReq,
  POSTPopRes,
  GETProgressReq,
  GETProgressRes,
};
