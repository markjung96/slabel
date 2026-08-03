import type { BlogCard } from "@/types"

/**
 * 실제로 발행한 글만 넣는다.
 *
 * 이전에는 존재하지 않는 글 6개가 하드코딩돼 있었고, 전부 같은 URL로 연결됐다.
 * 클릭했는데 해당 글이 없으면 학부모는 "관리 안 되는 학원"으로 판단한다.
 * 글이 없으면 빈 배열로 두는 편이 낫다 — 블로그 메뉴 자체가 숨겨진다.
 */
export const blogCards: BlogCard[] = []
