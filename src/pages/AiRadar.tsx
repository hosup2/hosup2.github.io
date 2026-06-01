import { FlowPipeline } from '../components/ui/FlowPipeline';
import { ProjectHeader } from '../components/ui/ProjectHeader';
import { SectionTitle } from '../components/ui/SectionTitle';
import { SlideShow, type Slide } from '../components/ui/SlideShow';
import { TechBadge } from '../components/ui/TechBadge';
import { IntroSplashMini, WordCloudMini } from '../components/ui/AiRadarDemo';

const STACK_GROUPS = [
  { label: '프론트엔드', badges: ['Next.js 16 (App Router)', 'React 19', 'TypeScript'] },
  { label: '스타일링',   badges: ['Tailwind CSS v4', 'Framer Motion'] },
  { label: '기타',       badges: ['TanStack Query v5', 'Recharts', 'Axios', 'next-themes'] },
];

const slides: Slide[] = [
  {
    label: '개요',
    image: './screenshots/airadar-logo.png',
    content: (
      <>
        <ProjectHeader
          no="PROJECT 02" name="AiRadar"
          description="AI 뉴스·논문·GitHub 레포지토리를 30분 주기로 자동 수집·분석하고, 사용자 행동 기반 개인화 피드를 제공하는 실시간 AI 기술 인텔리전스 플랫폼"
          period="2026.03 ~ 2026.04 (6주)" team="6인 팀 · FE 3 / BE 2 / INFRA 1"
          role="Frontend — 인트로 스플래시, 뉴스·논문·대시보드, 인증, 이벤트 트래킹"
          accentClass="text-sky-600" gradientFrom="from-sky-500" gradientTo="to-indigo-500"
        />
        <section>
          <SectionTitle label="기술 스택" />
          <div className="space-y-3">
            {STACK_GROUPS.map(({ label, badges }) => (
              <div key={label} className="flex gap-3 items-start">
                <span className="text-slate-500 text-xs w-28 shrink-0 mt-1">{label}</span>
                <div className="flex flex-wrap gap-2">
                  {badges.map((b) => <TechBadge key={b} label={b} />)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    ),
  },
  {
    label: '라이브 데모',
    fullWidth: true,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-6" style={{ height: 340 }}>
          {/* IntroSplash Mini */}
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-widest text-slate-500 uppercase font-semibold">
              인트로 스플래시 — CSS 애니메이션
            </p>
            <div className="flex-1 relative rounded-lg overflow-hidden border border-[var(--bd)]">
              <IntroSplashMini />
            </div>
          </div>

          {/* WordCloud Mini */}
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-widest text-slate-500 uppercase font-semibold">
              워드클라우드 — 레이더 빔 + 피보나치 나선
            </p>
            <div className="flex-1 relative rounded-lg border border-[var(--bd)] overflow-hidden">
              <WordCloudMini />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">인트로 스플래시 구현 포인트</h3>
            <ul className="text-slate-600 text-xs leading-relaxed space-y-1">
              <li>• 순수 CSS keyframes로 수평·수직 빔, 파티클 구현 (JS 라이브러리 불사용)</li>
              <li>• 상태 메시지 순차 전환 + 진행률 불규칙 증가 → 실제 로딩 느낌 연출</li>
              <li>• opacity + scale 조합의 exit 트랜지션으로 부드러운 화면 전환</li>
            </ul>
          </div>
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">워드클라우드 구현 포인트</h3>
            <ul className="text-slate-600 text-xs leading-relaxed space-y-1">
              <li>• 황금각 137.5° 피보나치 나선 배치 + AABB 충돌 감지로 키워드 겹침 방지</li>
              <li>• requestAnimationFrame으로 레이더 빔 회전, 빔 통과 키워드 발광 강조</li>
              <li>• conic-gradient + mask-image 조합으로 부채꼴 빔 궤적 표현</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '프론트 구현',
    fullWidth: true,
    content: (
      <div className="space-y-3">
        <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
          <h3 className="text-slate-800 text-sm font-bold mb-2">뉴스 · 논문 — 동일 구조, 공통 구현</h3>
          <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
            <li>• <code className="text-sky-600 bg-sky-50 px-1 rounded text-xs font-mono">IntersectionObserver</code>로 하단 anchor 감지 → fetchNextPage 트리거 (무한 스크롤)</li>
            <li>• 지역·날짜·카테고리를 useInfiniteQuery query key에 포함, 필터 변경 시 자동 재요청 및 캐시 분리</li>
            <li>• CalendarModal 날짜 범위 선택 → 가용 날짜만 활성화, 논문은 카테고리 필터 추가</li>
            <li>• ALS 추천 컨텐츠 별도 fetch, isLoggedIn 상태로 쿼리 enabled 조건부 제어</li>
          </ul>
        </div>
        <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
          <h3 className="text-slate-800 text-sm font-bold mb-2">JWT 인증 시스템</h3>
          <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
            <li>• Axios 인터셉터로 401 응답 시 Refresh Token 자동 재발급 후 원 요청 재시도</li>
            <li>• AuthContext에서 isLoggedIn, isInitialized, onboardingCompleted 상태 전역 관리</li>
            <li>• auth-logout 커스텀 이벤트로 인터셉터(서비스 레이어)와 Context(UI 레이어) 간 의존성 없이 로그아웃 동기화</li>
          </ul>
        </div>
        <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
          <h3 className="text-slate-800 text-sm font-bold mb-2">사용자 행동 이벤트 트래킹</h3>
          <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
            <li>• Fire-and-Forget 패턴: 전 이벤트 API 호출을 await 없이 발송, 실패 무시로 UI 영향 제거</li>
            <li>• useArticleViewTracking: 마운트 시 Date.now() 기록, 언마운트 시 체류 시간 → article-view 이벤트 발송</li>
            <li>• 북마크 토글 낙관적 업데이트: API 응답 전 UI 먼저 변경, 실패 시 이전 상태 롤백</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    label: '문제 해결',
    fullWidth: true,
    content: (
      <section>
        <div className="space-y-4">
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-6 space-y-5">
            <h3 className="text-slate-800 text-sm font-semibold">Next.js 도입 목적과 실제 구현 사이의 괴리</h3>
            <FlowPipeline title="의도 vs 현실" rows={[
              { prefix: '의도', prefixColor: 'sky',   steps: ['Next.js SSR', '초기 HTML 완성'], outcome: '검색 유입', outcomeStatus: 'success' },
              { prefix: '현실', prefixColor: 'amber', steps: ["'use client' 과다", 'CSR'],       outcome: 'SEO 미달',  outcomeStatus: 'danger'  },
            ]} />
            <div><p className="text-slate-500 text-xs mb-1">원인</p><p className="text-slate-600 text-sm">JWT 토큰을 localStorage에 저장하여 서버가 인증 상태를 읽을 수 없었고, 인증에 의존하는 개인화 피드·이벤트 트래킹·조건부 렌더링이 모두 클라이언트로 이동</p></div>
            <FlowPipeline title="해결 방향" rows={[
              { prefix: '현재', prefixColor: 'amber', steps: ['localStorage JWT', '서버 인증 불가', '전체 CSR'], outcome: 'SEO 미달',  outcomeStatus: 'danger'  },
              { prefix: '개선', prefixColor: 'sky',   steps: ['HttpOnly Cookie', 'middleware.ts 인증', 'RSC 초기 렌더'], outcome: 'SEO 달성', outcomeStatus: 'success' },
            ]} />
            <div><p className="text-slate-500 text-xs mb-1">교훈</p><p className="text-slate-600 text-sm">Next.js를 선택했다면 처음부터 HttpOnly Cookie 기반 인증 구조를 설계했어야 한다</p></div>
          </div>
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-5 space-y-3">
            <h3 className="text-slate-800 text-sm font-semibold">Next.js 16 + React 19 Hydration 불일치</h3>
            <div><p className="text-slate-500 text-xs mb-1">문제</p><p className="text-slate-600 text-sm">Server Component에서 렌더링한 HTML과 클라이언트 hydration 결과가 달라 콘솔 오류 빈발</p></div>
            <div><p className="text-slate-500 text-xs mb-1">원인</p><p className="text-slate-600 text-sm">'use client' 경계 미설정 상태에서 localStorage, window 등 브라우저 전용 API를 Server Component에서 참조</p></div>
            <div><p className="text-slate-500 text-xs mb-1">해결</p><p className="text-slate-600 text-sm">브라우저 API 의존 로직을 'use client' 컴포넌트로 분리하고, 초기값이 필요한 경우 useEffect로 클라이언트 마운트 후 적용하도록 처리</p></div>
          </div>
        </div>
      </section>
    ),
  },
  {
    label: '회고',
    fullWidth: true,
    content: (
      <section>
        <div className="space-y-3">
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">배운 점</h3>
            <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
              <li>• CSS 애니메이션(conic-gradient, keyframes)만으로 JS 라이브러리 없이 고퀄리티 인터랙티브 UI 구현 가능</li>
              <li>• TanStack Query의 query key 설계가 캐시 전략의 핵심 — 필터 조합을 key에 포함하면 별도 무효화 로직 없이 자동 분리</li>
              <li>• 피보나치 나선 알고리즘처럼 수학적 원리를 UI 배치에 직접 적용하면 직관적이고 균형 있는 레이아웃 구현 가능</li>
            </ul>
          </div>
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">어려웠던 점</h3>
            <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
              <li>• 워드클라우드 키워드 겹침 방지 — 키워드 길이·폰트 크기가 제각각이어서 충돌 감지 로직을 추가로 작성해야 했음</li>
              <li>• Next.js 16 + React 19 조합의 Server/Client Component 경계 관리 — hydration 불일치 오류가 초기에 빈번</li>
            </ul>
          </div>
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">개선 사항</h3>
            <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
              <li>• 인증 구조를 HttpOnly Cookie 기반으로 재설계하여 middleware.ts 인증 → RSC 초기 렌더링 구조로 전환</li>
            </ul>
          </div>
        </div>
      </section>
    ),
  },
];

export function AiRadar() {
  return <SlideShow slides={slides} />;
}
