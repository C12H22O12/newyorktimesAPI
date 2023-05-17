type Legacy = {
  xlarge: string;
  xlargewidth: number;
  xlargeheight: number;
};

type Keyword = {
  name: string;
  value: string;
  rank: number;
  major: string;
};

type Multimedia = {
  rank: number;
  subtype: string;
  caption: null | string;
  credit: null | string;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Legacy;
  subType: "xlarge";
  crop_name: "articleLarge";
};

type Headline = {
  main: string;
  kicker?: null | string;
  content_kicker?: null | string;
  print_headline?: null | string;
  name?: null | string;
  seo?: null | string;
  sub?: null | string;
};

type Person = {
  firstname: string;
  middlename: null | string;
  lastname: string;
  qualifier: null | string;
  title: null | string;
  role: string;
  organization: string;
  rank: number;
};

type Byline = {
  original: string;
  person?: Array<Person>;
  organization?: null;
};

/**
* Article Type
  @param web_url url
  @param source newspaper
  @param headline Headline
  @param pub_date public data
  @param section_name Nations
  @param byline editor
  @param uri uri
*/
export type ArticleType = {
  abstract?: string;
  web_url: string; // url
  snippet?: string;
  lead_paragraph?: string;
  source: string; // newspaper
  multimedia?: Array<Multimedia>;
  headline: Headline; // Headline
  keywords?: Array<Keyword>;
  pub_date: string; // public data
  document_type?: string;
  news_desk?: string;
  section_name: string; // Nations
  subsection_name?: string;
  byline: Byline; // editor
  type_of_material?: string;
  _id?: string;
  word_count?: number;
  uri: string; // uri
};

export type useDataTypes = {
  moreData: boolean;
  target: React.MutableRefObject<any>;
  isLoading: boolean;
};
