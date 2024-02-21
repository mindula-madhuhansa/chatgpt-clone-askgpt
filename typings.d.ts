interface Message {
  text: string;
  createdAt: firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}
