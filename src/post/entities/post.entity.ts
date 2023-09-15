export class PostEntity {
  id: string;
  content: string;
  accountId: string;
  createdAt: Date;

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }

  static handlerPostList(postList: PostEntity[]) {
    return postList.map((post) => new PostEntity(post));
  }
}

