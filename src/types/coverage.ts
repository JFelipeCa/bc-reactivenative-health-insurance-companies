export type Coverage = {
  id: string;
  name: string;
  category: string;
  detail: string;
  monthlyCopay: number;
};

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  CoverageDetail: { coverage: Coverage };
  Enrollment: undefined;
};

export type TabParamList = {
  Home: undefined;
  Coverages: undefined;
};
