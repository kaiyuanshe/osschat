/**
 * For map `org/repo` to WeChat Room id(s)
 */
export interface RepoConfig {
  [fullName: string]: string | string[],
}
