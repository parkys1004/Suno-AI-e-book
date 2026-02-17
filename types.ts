export interface SubSection {
  id?: string;
  title: string;
  items: string[];
}

export interface Chapter {
  id: string;
  title: string;
  subTitle?: string;
  content: SubSection[];
}

export interface BookData {
  title: string;
  subTitle: string;
  chapters: Chapter[];
  appendix: Chapter;
}