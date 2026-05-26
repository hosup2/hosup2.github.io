import { FlowBlock } from '../components/ui/FlowBlock';
import { ProjectHeader } from '../components/ui/ProjectHeader';
import { SectionTitle } from '../components/ui/SectionTitle';
import { TechBadge } from '../components/ui/TechBadge';

const DIR_STRUCTURE = `src/
├── pages/
│   ├── home/Home.tsx          # 대시보드 (최근 노트·스트릭·북마크)
│   └── ...
├── components/
│   ├── common/                # Modal, Button 등
│   ├── features/              # 도메인별 컴포넌트
│   └── layout/checkpoint/     # 버전 관리 UI
├── api/*/adapter.ts           # API 응답 → 프론트 상태 변환 레이어
├── store/                     # Zustand 전역 상태
└── types/                     # TypeScript 타입 정의 (도메인별 분리)`;

const STACK_GROUPS = [
  { label: '프레임워크', variant: 'blue' as const, badges: ['React', 'TypeScript', 'Vite', 'Electron'] },
  { label: '에디터', variant: 'indigo' as const, badges: ['Tiptap', 'CodeMirror', 'Yjs'] },
  { label: '상태관리', variant: 'default' as const, badges: ['Zustand'] },
  { label: '기타', variant: 'default' as const, badges: ['ReactFlow', 'Axios', 'react-router-dom', 'dayjs'] },
];

const STORES = [
  { name: 'useAuthStore', desc: '로그인/로그아웃, access token 관리, 자동 갱신, persist' },
  { name: 'useNoteStore', desc: '노트 목록 캐싱, 30초 생성 쿨다운, 낙관적 메타데이터 업데이트, persist' },
  { name: 'useModalStore', desc: '스택 기반 모달 레이어 (CONFIRM, NODE_SELECTOR 등)' },
  { name: 'useToastStore', desc: '전역 토스트 알림' },
  { name: 'useThemeStore', desc: '다크/라이트 테마' },
  { name: 'useCodeEditorStore', desc: '코드 에디터 설정 상태' },
];

export function Synapse() {
  return (
    <div className="px-12 py-10 max-w-3xl">
      <ProjectHeader
        no="PROJECT 03"
        name="Synapse"
        description="팀원과 동시에 노트를 작성하고, 코드를 실행하며, 버전 히스토리를 관리할 수 있는 실시간 협업 노트 & 코드 에디터 데스크탑 앱"
        period="2025"
        team="FE / BE 협업"
        role="Frontend — 데이터 구조 설계, Home 화면, 버전 관리 기능, 전역 상태관리"
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
          백엔드 응답 타입과 프론트 UI 모델을 <code className="text-sky-300 font-mono">types/</code>에서 명확히 분리,{' '}
          <code className="text-sky-300 font-mono">api/*/adapter.ts</code>에서 변환.
          서버 상태·클라이언트 상태·영속 상태를 Zustand store 단위로 역할 분리.
        </p>
      </section>

      {/* 스크린샷 플레이스홀더 */}
      <section className="mb-12">
        <SectionTitle label="스크린샷" />
        <div className="grid grid-cols-2 gap-4">
          {['Home 대시보드', '스트릭 히트맵', 'Checkpoint 화면', '버전 Diff 뷰어'].map((label) => (
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
            <h3 className="text-sky-400 text-sm font-semibold mb-3">API 응답 타입 시스템 설계</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• 도메인별 디렉토리 구조 설계 (note/, checkpoint/, ai/, user/ 등)</li>
              <li>• 각 API 엔드포인트마다 요청/응답 타입을 별도 파일로 관리 (GetNotes.ts, CreateNote.ts 등)</li>
              <li>• 백엔드 응답 구조가 바뀌어도 adapter 레이어만 수정하면 되는 구조로 변경 파급 최소화</li>
            </ul>
          </div>
          <div>
            <h3 className="text-indigo-400 text-sm font-semibold mb-3">Adapter 패턴 데이터 변환 계층</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">adaptNotesForSidebar</code>: 날짜 포맷(string → timestamp) 및 기본값 처리 일괄 적용</li>
              <li>• <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">adaptStreakDates</code>: 백엔드 스트릭 응답을 캘린더 렌더링용 날짜 배열로 변환</li>
              <li>• 페이지 컴포넌트가 raw API 응답에 의존하지 않도록 인터페이스 분리</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sky-400 text-sm font-semibold mb-3">Home 대시보드 & 스트릭 히트맵</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• Promise.all로 노트 목록 + 스트릭 데이터 병렬 fetch → 로딩 시간 단축</li>
              <li>• notes-changed 커스텀 이벤트로 사이드바 변경 시 silent refresh (로딩 스피너 없이 백그라운드 갱신)</li>
              <li>• 26주 × 7일 캘린더 그리드, GitHub 잔디 스타일. useMemo로 날짜·주·월 라벨 연산 캐싱</li>
            </ul>
          </div>
          <div>
            <h3 className="text-indigo-400 text-sm font-semibold mb-3">버전 관리(Checkpoint) 기능</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• CheckpointSidebar: 슬롯 목록 조회, 저장/복구 액션 처리</li>
              <li>• CheckpointItem: 슬롯 상태(빈 슬롯 / 저장됨) 시각화, 저장 날짜 표시</li>
              <li>• DiffViewerModal: 현재 코드 ↔ 저장된 버전 diff 비교 (react-diff-viewer-continued)</li>
              <li>• 저장 중 isProcessing overlay 처리로 중복 액션 방지</li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-300 text-sm font-semibold mb-3">전역 상태관리 Zustand</h3>
            <div className="space-y-2">
              {STORES.map(({ name, desc }) => (
                <div key={name} className="flex gap-3">
                  <code className="text-sky-300 bg-[#0a1628] px-2 py-0.5 rounded text-xs font-mono shrink-0 h-fit">{name}</code>
                  <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-xs mt-3">partialize 미들웨어로 필요한 상태만 localStorage에 저장</p>
          </div>
        </div>
      </section>

      {/* 문제 해결 */}
      <section className="mb-12">
        <SectionTitle label="문제 해결 경험" />
        <div className="space-y-4">
          {[
            {
              title: '토큰 타이밍 이슈',
              problem: 'Axios 인터셉터가 store에서 토큰을 읽는 구조인데, getUserInfo() 호출 전에 store에 토큰이 없었음',
              solution: 'login() 액션 내에서 set({ accessToken: token }) 이후 getUserInfo()를 호출하는 순서를 명시적으로 보장',
            },
            {
              title: 'Silent Refresh',
              problem: '사이드바에서 노트를 생성·삭제하면 Home 대시보드가 스피너와 함께 깜빡이는 UX 문제',
              solution: 'fetchDashboardData(isSilent: boolean) 플래그 분기. notes-changed 이벤트 수신 시 isSilent=true로 호출',
            },
            {
              title: 'Persist 범위 제어',
              problem: '새로고침 후 fetchingIds가 true로 남아 특정 노트가 영구적으로 로딩 상태로 보이는 버그',
              solution: 'partialize 옵션으로 fetchingIds를 persist 대상에서 제외, 새로고침 시 항상 초기화',
            },
          ].map(({ title, problem, solution }) => (
            <div key={title} className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-5 space-y-3">
              <h3 className="text-slate-200 text-sm font-semibold">{title}</h3>
              <div>
                <p className="text-slate-500 text-xs mb-1">문제</p>
                <p className="text-slate-400 text-sm">{problem}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs mb-1">해결</p>
                <p className="text-slate-400 text-sm">{solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 회고 */}
      <section className="mb-10">
        <SectionTitle label="프로젝트 회고" />
        <div className="space-y-6">
          <div>
            <h3 className="text-sky-400 text-sm font-semibold mb-2">배운 점</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-1.5">
              <li>• 백엔드 응답 타입과 프론트 UI 모델을 타입 레이어에서 명확히 분리하면, API 스펙 변경이 컴포넌트까지 전파되지 않아 유지보수 비용 감소</li>
              <li>• Zustand partialize로 persist 범위를 세밀하게 제어하는 것이 새로고침 후 상태 일관성 유지의 핵심</li>
              <li>• 커스텀 이벤트(notes-changed)를 활용한 컴포넌트 간 통신이 prop drilling 없이 계층 간 상태 동기화를 깔끔하게 해결</li>
            </ul>
          </div>
          <div>
            <h3 className="text-indigo-400 text-sm font-semibold mb-2">어려웠던 점</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-1.5">
              <li>• Zustand persist와 Electron 데이터 저장 경로 사이에서 상태 경계 설정이 쉽지 않았음</li>
              <li>• Yjs 기반 실시간 협업 상태와 Zustand 전역 상태를 함께 운용할 때 충돌·동기화 시점 관리가 복잡했음</li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-400 text-sm font-semibold mb-2">개선 사항</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-1.5">
              <li>• 히트맵 월 라벨을 CSS grid 기반으로 재설계해 JS 픽셀 계산 의존성 제거</li>
              <li>• useNoteStore의 쿨다운 로직을 별도 훅으로 분리하여 store 단일 책임 원칙 강화</li>
              <li>• Checkpoint diff 뷰어를 모달 대신 사이드바 분할 패널로 전환하여 코드 편집과 버전 비교를 동시에 볼 수 있는 UX 개선</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
