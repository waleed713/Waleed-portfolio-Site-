export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  details: string; // markdown case-study text
  image: string;
  tags: string[];
  liveUrl: string;
  client: string;
  year: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown
  cover: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  project: string;
  message: string;
  read: boolean;
  createdAt: string;
};
