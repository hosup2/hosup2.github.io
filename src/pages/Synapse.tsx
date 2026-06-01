import { FlowPipeline } from '../components/ui/FlowPipeline';
import { ProjectHeader } from '../components/ui/ProjectHeader';
import { SectionTitle } from '../components/ui/SectionTitle';
import { SlideShow, type Slide } from '../components/ui/SlideShow';
import { TechBadge } from '../components/ui/TechBadge';

const STACK_GROUPS = [
  { label: '프론트엔드', badges: ['React 18', 'TypeScript', 'Vite'] },
  { label: '상태관리',   badges: ['Zustand'] },
  { label: '기타',       badges: ['Axios', 'react-router-dom', 'dayjs'] },
];

const STORES = [
  { name: 'useAuthStore',  desc: 'Access Token 저장, Axios 인터셉터 연동, 자동 갱신, persist' },
  { name: 'useNoteStore',  desc: '노트 목록 캐싱, 30초 생성 쿨다운, 낙관적 메타데이터 업데이트, fetchingIds persist 제외' },
  { name: 'useModalStore', desc: '스택 기반 모달 레이어 (CONFIRM, NODE_SELECTOR 등)' },
  { name: 'useToastStore', desc: '전역 토스트 알림 (성공·에러·경고)' },
  { name: 'useThemeStore', desc: 'light·dark·deepblue·cookie 4가지 테마 모드, persist' },
];

const slides: Slide[] = [
  {
    label: '개요',
    image: './screenshots/synapse-logo.png',
    content: (
      <>
        <ProjectHeader
          no="PROJECT 01" name="Synapse"
          description="팀원과 동시에 노트를 작성하고, 코드를 실행하며, 버전 히스토리를 관리할 수 있는 실시간 협업 노트 & 코드 에디터 데스크탑 앱"
          period="2026.01 ~ 2026.02 (5주)" team="6인 팀 · FE 2 / BE 3 / FS 1"
          role="Frontend — 데이터 구조 설계, Home 화면, 버전 관리 기능, 전역 상태관리"
          accentClass="text-orange-500" gradientFrom="from-orange-400" gradientTo="to-amber-400"
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
    label: '데이터 구조 & 상태관리',
    fullWidth: true,
    content: (
      <div className="space-y-3">
        <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
          <h3 className="text-slate-800 text-sm font-bold mb-2">API 응답 타입 시스템 설계</h3>
          <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
            <li>• 도메인별 디렉토리 구조 설계 (note/, checkpoint/, ai/, user/ 등)</li>
            <li>• 각 API 엔드포인트마다 요청/응답 타입을 별도 파일로 관리 (GetNotes.ts, CreateNote.ts 등)</li>
            <li>• 백엔드 응답 구조가 바뀌어도 adapter 레이어만 수정하면 되는 구조로 변경 파급 최소화</li>
          </ul>
        </div>
        <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
          <h3 className="text-slate-800 text-sm font-bold mb-2">Adapter 패턴 데이터 변환 계층</h3>
          <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
            <li>• <code className="text-orange-600 bg-orange-50 px-1 rounded text-xs font-mono">adaptNotesForSidebar</code>: 날짜 포맷(string → timestamp) 및 기본값 처리 일괄 적용</li>
            <li>• <code className="text-orange-600 bg-orange-50 px-1 rounded text-xs font-mono">adaptStreakDates</code>: 백엔드 스트릭 응답을 캘린더 렌더링용 날짜 배열로 변환</li>
            <li>• 페이지 컴포넌트가 raw API 응답에 의존하지 않도록 인터페이스 분리</li>
          </ul>
        </div>
        <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
          <h3 className="text-slate-800 text-sm font-bold mb-2">전역 상태관리 Zustand</h3>
          <div className="space-y-2 mb-2">
            {STORES.map(({ name, desc }) => (
              <div key={name} className="flex gap-3">
                <code className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-xs font-mono shrink-0 h-fit">{name}</code>
                <p className="text-slate-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs">partialize 미들웨어로 필요한 상태만 localStorage에 저장</p>
        </div>
      </div>
    ),
  },
  {
    label: 'Home 대시보드',
    fullWidth: true,
    content: (
      <div className="space-y-4">
        <div className="rounded-lg overflow-hidden border border-[var(--bd)]">
          <img src="./screenshots/synapse-home.png" alt="Synapse Home 대시보드"
            className="w-full h-auto" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">4개 섹션 구성</h3>
            <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
              <li>• <strong className="text-slate-700">최근 노트</strong> — Promise.all 병렬 fetch로 로딩 단축</li>
              <li>• <strong className="text-slate-700">스트릭 히트맵</strong> — 26주 × 7일 GitHub 잔디 스타일, useMemo 연산 캐싱</li>
              <li>• <strong className="text-slate-700">노트 북마크</strong> — 즐겨찾기 노트 바로 접근</li>
              <li>• <strong className="text-slate-700">블록 북마크</strong> — 코드 블록 별도 모아보기</li>
            </ul>
          </div>
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">Silent Refresh 구현</h3>
            <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
              <li>• 사이드바 노트 생성·삭제 시 Home 대시보드가 스피너와 함께 깜빡이는 UX 문제</li>
              <li>• <code className="text-orange-600 bg-orange-50 px-1 rounded text-xs font-mono">notes-changed</code> 커스텀 이벤트로 변경 감지</li>
              <li>• <code className="text-orange-600 bg-orange-50 px-1 rounded text-xs font-mono">isSilent=true</code> 플래그로 스피너 없이 백그라운드 갱신</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Checkpoint',
    fullWidth: true,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-widest text-slate-500 uppercase font-semibold">슬롯 목록 · 저장 · 복구</p>
            <div className="rounded-lg overflow-hidden border border-[var(--bd)]">
              <img src="./screenshots/synapse-checkpoint.png" alt="Checkpoint 슬롯"
                className="w-full h-auto" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-widest text-slate-500 uppercase font-semibold">Diff 비교 뷰어</p>
            <div className="rounded-lg overflow-hidden border border-[var(--bd)]">
              <img src="./screenshots/synapse-version.png" alt="Diff 비교 뷰어"
                className="w-full h-auto" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">Checkpoint 슬롯 관리</h3>
            <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
              <li>• CheckpointSidebar — 슬롯 목록 조회, 저장/복구 액션 처리</li>
              <li>• CheckpointItem — 빈 슬롯 / 저장됨 상태 시각화, 저장 날짜 표시</li>
              <li>• isProcessing overlay로 저장 중 중복 액션 방지</li>
            </ul>
          </div>
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">DiffViewerModal</h3>
            <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
              <li>• 현재 코드 ↔ 저장된 버전 나란히 diff 비교</li>
              <li>• react-diff-viewer-continued 라이브러리 활용</li>
              <li>• 복구 전 변경 내용 확인 후 선택적 롤백 가능</li>
            </ul>
          </div>
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
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-5 space-y-4">
            <h3 className="text-slate-800 text-sm font-semibold">토큰 타이밍 이슈</h3>
            <FlowPipeline rows={[
              { prefix: '문제', prefixColor: 'amber', steps: ['토큰 미설정', 'getUserInfo() 호출'], outcome: '인증 실패', outcomeStatus: 'danger' },
              { prefix: '해결', prefixColor: 'sky',   steps: ['set(accessToken)', 'getUserInfo() 호출'], outcome: '인증 성공', outcomeStatus: 'success' },
            ]} />
            <p className="text-slate-500 text-xs">login() 액션 내에서 set({'{ accessToken: token }'}) 이후 getUserInfo() 호출 순서를 명시적으로 보장</p>
          </div>

          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-5 space-y-4">
            <h3 className="text-slate-800 text-sm font-semibold">Silent Refresh — 대시보드 깜빡임</h3>
            <FlowPipeline rows={[
              { prefix: '문제', prefixColor: 'amber', steps: ['노트 생성·삭제', '스피너 재렌더링'], outcome: 'UX 깜빡임', outcomeStatus: 'danger' },
              { prefix: '해결', prefixColor: 'sky',   steps: ['notes-changed 이벤트', 'isSilent=true 호출'], outcome: '백그라운드 갱신', outcomeStatus: 'success' },
            ]} />
            <p className="text-slate-500 text-xs">fetchDashboardData(isSilent: boolean) 플래그 분기로 스피너 없이 데이터 최신화</p>
          </div>

          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-5 space-y-4">
            <h3 className="text-slate-800 text-sm font-semibold">Persist 범위 미설정 → 상태 잔류 버그</h3>
            <FlowPipeline rows={[
              { prefix: '문제', prefixColor: 'amber', steps: ['새로고침', 'fetchingIds=true 잔류'], outcome: '영구 로딩', outcomeStatus: 'danger' },
              { prefix: '해결', prefixColor: 'sky',   steps: ['partialize 제외 설정', '새로고침'], outcome: '정상 초기화', outcomeStatus: 'success' },
            ]} />
            <p className="text-slate-500 text-xs">partialize 옵션으로 fetchingIds를 persist 대상에서 제외, 새로고침 시 항상 초기값으로 복원</p>
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
              <li>• 백엔드 응답 타입과 프론트 UI 모델을 타입 레이어에서 명확히 분리하면, API 스펙 변경이 컴포넌트까지 전파되지 않아 유지보수 비용 감소</li>
              <li>• Zustand partialize로 persist 범위를 세밀하게 제어하는 것이 새로고침 후 상태 일관성 유지의 핵심</li>
              <li>• 커스텀 이벤트(notes-changed)를 활용한 컴포넌트 간 통신이 prop drilling 없이 계층 간 상태 동기화를 깔끔하게 해결</li>
            </ul>
          </div>
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">어려웠던 점</h3>
            <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
              <li>• 히트맵 월 라벨 위치를 JS 픽셀 계산으로 처리하다 보니 윈도우 너비 변동 시 레이아웃 틀어짐 발생</li>
              <li>• useNoteStore 쿨다운 로직이 store 내에 혼재되어 단일 책임 원칙 위반 구조가 되는 것을 뒤늦게 인지</li>
              <li>• Checkpoint 저장·복구 중 isProcessing 상태 관리와 에러 롤백 시나리오가 경우의 수가 많아 구현이 복잡했음</li>
            </ul>
          </div>
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">개선 사항</h3>
            <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
              <li>• 히트맵 월 라벨을 CSS grid 기반으로 재설계해 JS 픽셀 계산 의존성 제거</li>
              <li>• useNoteStore의 쿨다운 로직을 별도 훅으로 분리하여 store 단일 책임 원칙 강화</li>
              <li>• Checkpoint diff 뷰어를 모달 대신 사이드바 분할 패널로 전환하여 코드 편집과 버전 비교를 동시에 볼 수 있는 UX 개선</li>
            </ul>
          </div>
        </div>
      </section>
    ),
  },
];

export function Synapse() {
  return <SlideShow slides={slides} />;
}
