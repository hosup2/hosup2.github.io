import { FlowBlock } from '../components/ui/FlowBlock';
import { ProjectHeader } from '../components/ui/ProjectHeader';
import { SectionTitle } from '../components/ui/SectionTitle';
import { TechBadge } from '../components/ui/TechBadge';

const DIR_STRUCTURE = `frontend/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx            # 홈 (IntroSplash + HeroSection)
│   ├── news/page.tsx       # 뉴스 (무한 스크롤 + 개인화 피드)
│   ├── papers/page.tsx     # 논문
│   ├── dashboard/page.tsx  # 대시보드 (워드클라우드)
│   ├── jobs/page.tsx       # 직업 AI 분석
│   └── profile/page.tsx    # 마이페이지
├── components/
│   ├── common/             # Modal, Button, Input 등
│   ├── features/           # 도메인별 컴포넌트
│   └── layout/             # Header, Footer, MainLayout
├── hooks/queries/          # TanStack Query 훅 모음
├── services/               # API 호출 레이어 (Axios)
├── store/                  # 전역 상태
└── types/                  # TypeScript 타입 정의`;

const SSR_GAP = `의도:  Next.js SSR → 초기 HTML 완성 → 검색 유입
현실:  'use client' 과다 → CSR → SEO 미달`;

const SSR_FIX = `현재:  localStorage JWT → 서버 인증 불가 → 전체 CSR → SEO 미달
개선:  HttpOnly Cookie → middleware.ts 인증 → RSC 초기 렌더 → SEO 달성`;

const STACK_GROUPS = [
  { label: '프레임워크', variant: 'blue' as const, badges: ['Next.js 16 (App Router)', 'React 19'] },
  { label: '언어', variant: 'default' as const, badges: ['TypeScript'] },
  { label: '스타일링', variant: 'default' as const, badges: ['Tailwind CSS v4'] },
  { label: '서버 상태', variant: 'indigo' as const, badges: ['TanStack Query v5'] },
  { label: '애니메이션', variant: 'default' as const, badges: ['Framer Motion'] },
  { label: '기타', variant: 'default' as const, badges: ['Recharts', 'Axios', 'next-themes'] },
];

export function AiRadar() {
  return (
    <div className="px-12 py-10 max-w-3xl">
      <ProjectHeader
        no="PROJECT 02"
        name="AiRadar"
        description="AI 뉴스·논문·GitHub 레포지토리를 30분 주기로 자동 수집·분석하고, 사용자 행동 기반 개인화 피드를 제공하는 실시간 AI 기술 인텔리전스 플랫폼"
        period="SSAFY 14기 2학기 (약 6주)"
        team="6인 팀"
        role="Frontend — 인트로 스플래시, 뉴스·논문·대시보드·직업 페이지, 인증, 이벤트 트래킹"
      />

      {/* 기술 스택 */}
      <section className="mb-12">
        <SectionTitle label="기술 스택" />
        <div className="space-y-3">
          {STACK_GROUPS.map(({ label, variant, badges }) => (
            <div key={label} className="flex gap-3 items-start">
              <span className="text-slate-500 text-xs w-28 shrink-0 mt-1">{label}</span>
              <div className="flex flex-wrap gap-2">
                {badges.map((b) => <TechBadge key={b} label={b} variant={variant} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 디렉토리 구조 */}
      <section className="mb-12">
        <SectionTitle label="프론트엔드 디렉토리 구조" />
        <FlowBlock>{DIR_STRUCTURE}</FlowBlock>
        <p className="text-slate-500 text-xs mt-3 leading-relaxed">
          설계 원칙: <code className="text-sky-300 font-mono">services/</code> →{' '}
          <code className="text-sky-300 font-mono">hooks/queries/</code> →{' '}
          <code className="text-sky-300 font-mono">components/</code> 단방향 의존성.
          서버 상태는 TanStack Query, UI 상태는 useState/useReducer로 명확히 분리.
        </p>
      </section>

      {/* 스크린샷 플레이스홀더 */}
      <section className="mb-12">
        <SectionTitle label="스크린샷" />
        <div className="grid grid-cols-2 gap-4">
          {['인트로 스플래시', '뉴스 피드', '대시보드 워드클라우드', '직업 분석'].map((label) => (
            <div
              key={label}
              className="aspect-video bg-[#0a1628] border border-[#1e3a5f] border-dashed rounded-lg flex items-center justify-center"
            >
              <span className="text-slate-600 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 본인 기여 */}
      <section className="mb-12">
        <SectionTitle label="본인 기여 상세" />
        <div className="space-y-8">
          <div>
            <h3 className="text-sky-400 text-sm font-semibold mb-3">인트로 스플래시 & 히어로 섹션</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• CSS 애니메이션만으로 진행률 바, 수평/수직 빔 흐름, 부유 점(particle) 효과 구현. 라이트/다크 모드 별도 CSS 클래스셋으로 분기</li>
              <li>• <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">conic-gradient</code> + <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">@keyframes</code> 회전으로 레이더 스캔 빔 표현</li>
              <li>• <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">mousemove</code> 이벤트 기반 마우스 위치 추적으로 콘텐츠 패럴랙스 기울기 효과 구현</li>
            </ul>
          </div>
          <div>
            <h3 className="text-indigo-400 text-sm font-semibold mb-3">뉴스 페이지 — 복합 필터 + 무한 스크롤 + 개인화 피드</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">IntersectionObserver</code>로 목록 하단 anchor 감지 → fetchNextPage 트리거</li>
              <li>• 지역·날짜·카테고리를 useInfiniteQuery query key에 포함하여 필터 변경 시 자동 재요청 및 캐시 분리</li>
              <li>• ALS 추천 기사 5건 별도 fetch, <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">isLoggedIn</code> 상태에 따라 쿼리 enabled 제어</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sky-400 text-sm font-semibold mb-3">대시보드 — 인터랙티브 워드클라우드</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• 피보나치 나선(황금각 137.5°) 알고리즘으로 30개 키워드 위치 계산 → 겹침 없이 자연스럽게 분산 배치</li>
              <li>• useRef + setInterval로 레이더 빔 각도를 프레임마다 갱신, 빔 통과 키워드 강조 효과</li>
              <li>• useSearchParams + router.push로 탭 전환 시 URL 쿼리 파라미터 업데이트 → 새로고침·공유 시 탭 상태 복원</li>
            </ul>
          </div>
          <div>
            <h3 className="text-indigo-400 text-sm font-semibold mb-3">사용자 행동 이벤트 트래킹</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• Fire-and-Forget 패턴: 전 이벤트 API 호출을 await 없이 발송, 실패 무시로 UI 영향 제거</li>
              <li>• useArticleViewTracking: 마운트 시 Date.now() 기록, 언마운트 시 체류 시간 계산 후 article-view 이벤트 발송</li>
              <li>• 북마크 토글 낙관적 업데이트: API 응답 전 UI 먼저 변경, 실패 시 이전 상태 롤백</li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-300 text-sm font-semibold mb-3">JWT 인증 시스템</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• Axios 인터셉터로 401 응답 시 Refresh Token 자동 재발급 후 원 요청 재시도</li>
              <li>• AuthContext에서 isLoggedIn, isInitialized, onboardingCompleted 상태 전역 관리</li>
              <li>• auth-logout 커스텀 이벤트로 인터셉터(서비스 레이어)와 Context(UI 레이어) 간 의존성 없이 로그아웃 동기화</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 문제 해결 */}
      <section className="mb-12">
        <SectionTitle label="문제 해결 경험" />
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-6 space-y-5">
          <h3 className="text-slate-200 text-sm font-semibold">Next.js 도입 목적과 실제 구현 사이의 괴리</h3>
          <FlowBlock title="의도 vs 현실">{SSR_GAP}</FlowBlock>
          <div>
            <p className="text-slate-500 text-xs mb-1">원인</p>
            <p className="text-slate-400 text-sm">JWT 토큰을 localStorage에 저장하여 서버가 인증 상태를 읽을 수 없었고, 인증에 의존하는 개인화 피드·이벤트 트래킹·조건부 렌더링이 모두 클라이언트로 이동. IntersectionObserver, setInterval, Framer Motion 등 브라우저 API 의존 기능이 더해짐</p>
          </div>
          <FlowBlock title="해결 방향">{SSR_FIX}</FlowBlock>
          <div>
            <p className="text-slate-500 text-xs mb-1">교훈</p>
            <p className="text-slate-400 text-sm">Next.js를 선택했다면 처음부터 HttpOnly Cookie 기반 인증 구조를 설계했어야 한다. 프레임워크 선택은 인증 구조까지 함께 결정해야 SSR 이점을 실제로 누릴 수 있음</p>
          </div>
        </div>
      </section>

      {/* 회고 */}
      <section className="mb-10">
        <SectionTitle label="프로젝트 회고" />
        <div className="space-y-6">
          <div>
            <h3 className="text-sky-400 text-sm font-semibold mb-2">배운 점</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-1.5">
              <li>• CSS 애니메이션(conic-gradient, keyframes)만으로 JS 라이브러리 없이 고퀄리티 인터랙티브 UI 구현 가능</li>
              <li>• TanStack Query의 query key 설계가 캐시 전략의 핵심 — 필터 조합을 key에 포함하면 별도 무효화 로직 없이 자동 분리</li>
              <li>• 피보나치 나선 알고리즘처럼 수학적 원리를 UI 배치에 직접 적용하면 직관적이고 균형 있는 레이아웃 구현 가능</li>
            </ul>
          </div>
          <div>
            <h3 className="text-indigo-400 text-sm font-semibold mb-2">어려웠던 점</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-1.5">
              <li>• 워드클라우드 키워드 겹침 방지 — 키워드 길이·폰트 크기가 제각각이어서 충돌 감지 로직을 추가로 작성해야 했음</li>
              <li>• Next.js 16 + React 19 조합의 Server/Client Component 경계 관리 — hydration 불일치 오류가 초기에 빈번</li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-400 text-sm font-semibold mb-2">개선 사항</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-1.5">
              <li>• 인증 구조를 HttpOnly Cookie 기반으로 재설계하여 middleware.ts 인증 → RSC 초기 렌더링 구조로 전환</li>
              <li>• 워드클라우드 빔 회전을 setInterval 대신 requestAnimationFrame으로 교체하여 프레임 드랍 없는 애니메이션 보장</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
