import type { SiteConfig } from "@/types"

/**
 * 실제 운영 정보만 담는다.
 *
 * 아직 개설/확인되지 않은 채널은 반드시 null로 둘 것.
 * placeholder URL을 넣어두면 학부모가 "삭제된 페이지"로 이동해서
 * 상담 직전에 이탈한다. null이면 해당 버튼 자체가 렌더링되지 않는다.
 */
export const siteConfig: SiteConfig = {
  name: "스라밸학원",
  description:
    "스라밸학원 - Study Life Balance. 체계적인 PT 시스템과 타이머 관리로 학생 개개인에게 최적화된 수학 교육을 제공합니다.",
  url: "https://스라밸.com",
  logo: "/images/logo.png",
  address: "경기 용인시 기흥구 흥덕2로 85 606호",
  phone: "010-3977-1695",

  // TODO(원장): 실제 값 확보 후 채울 것. 확보 전까지 null 유지.
  email: null, // 학원 대표 이메일 (예: slabel.math@naver.com)
  kakaoChannelUrl: null, // 카카오톡 채널 개설 후 https://pf.kakao.com/_XXXXX
  naverTalkUrl: null, // 네이버 톡톡 개설 후 https://talk.naver.com/XXXXX
  blogUrl: null, // 네이버 블로그 개설 후 https://blog.naver.com/XXXXX

  naverMapUrl: "https://map.naver.com/p/search/스라밸학원",
  kakaoMapUrl: "https://map.kakao.com/link/search/스라밸학원",
}

export const locationNote = "이마트 건너편"

/** 문의 채널이 하나라도 살아있는지 */
export const hasChatChannel = Boolean(
  siteConfig.kakaoChannelUrl || siteConfig.naverTalkUrl
)
