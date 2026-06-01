import { FlowPipeline } from '../components/ui/FlowPipeline';
import { MermaidDiagram } from '../components/ui/MermaidDiagram';
import { ProjectHeader } from '../components/ui/ProjectHeader';
import { SectionTitle } from '../components/ui/SectionTitle';
import { SlideShow, type Slide } from '../components/ui/SlideShow';
import { TechBadge } from '../components/ui/TechBadge';

const JWT_FLOW = `sequenceDiagram
    participant C as Client
    participant A as butterfly-api
    participant R as Redis
    participant D as DB
    C->>A: POST /login
    A->>D: 비밀번호 검증
    D-->>A: OK
    A->>R: SET refresh_token (7d)
    A-->>C: access (30m) + refresh (7d)
    C->>A: POST /refresh
    A->>R: GETDEL refresh_token
    R-->>A: 토큰 반환 + 삭제
    A->>R: SET 새 refresh_token
    A-->>C: 새 access + 새 refresh`;

const ONBOARDING_FLOW = `sequenceDiagram
    participant E as 기업 담당자
    participant Ad as Admin
    participant A as butterfly-api
    participant S as Redis / DB
    E->>A: 신청서 제출
    A->>S: 신청서 저장
    Ad->>A: 승인 처리
    A->>S: OWNER 생성
    A->>S: companyAuthNo 발급
    A->>S: 초대링크 SET (24h TTL)
    A-->>E: 초대 이메일 발송
    E->>A: 비밀번호 설정
    A->>S: OWNER ACTIVE
    A-->>E: 로그인 가능`;

const STACK_GROUPS = [
  { label: '프론트엔드', badges: ['React 18', 'TypeScript 5.6', 'Vite 5', 'Zustand', 'React Query'] },
  { label: '백엔드',     badges: ['Java 21', 'Spring Boot 3.5', 'Spring Security', 'JPA', 'Flyway'] },
  { label: 'DB / 캐시',  badges: ['MySQL 8.0', 'Redis 7'] },
];

const slides: Slide[] = [
  {
    label: '개요',
    image: './screenshots/butterfly-logo.png',
    content: (
      <>
        <ProjectHeader
          no="PROJECT 03" name="Butterfly"
          description="고객 행동 수집·세그먼트·캠페인·성과 분석을 하나로 통합한 B2B 멀티테넌트 CRM SaaS 플랫폼"
          period="2026.04 ~ 2026.05 (7주)" team="5인 팀 · FS 5"
          role="FullStack — 인증·인가 모듈, 멀티테넌트 온보딩 모듈"
          accentClass="text-violet-600" gradientFrom="from-violet-500" gradientTo="to-purple-500"
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
    label: '인증·인가 & JWT 흐름',
    fullWidth: true, wide: true,
    content: (
      <div className="grid grid-cols-2 gap-8">
        <section>
          <SectionTitle label="본인 기여 — 인증·인가 (butterfly-auth)" />
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <ul className="text-slate-600 text-sm leading-relaxed space-y-2">
              <li>• JWT Access Token (30분, 프로젝트 스코프) / Refresh Token (7일, 멤버 스코프) 이중 구조 설계 및 구현</li>
              <li>• Refresh Token Rotation — Redis <code className="text-violet-600 bg-violet-50 px-1 rounded text-xs font-mono">GETDEL</code> 원자 명령으로 동시 요청 레이스 컨디션 방어</li>
              <li>• JWT 블랙리스트 (<code className="text-violet-600 bg-violet-50 px-1 rounded text-xs font-mono">auth:blacklist:{'{jti}'}</code>) — 로그아웃 토큰 Redis 즉시 차단</li>
              <li>• 이메일 인증 코드 (6자리, 5분 TTL) 기반 회원가입 2단계 인증 게이트</li>
              <li>• SDK용 API Key 인증 (<code className="text-violet-600 bg-violet-50 px-1 rounded text-xs font-mono">pk_live_</code> 형식, SHA-256 해시 저장) + Rate Limiting (429 + Retry-After)</li>
              <li>• <code className="text-violet-600 bg-violet-50 px-1 rounded text-xs font-mono">ADMIN &gt; OWNER &gt; EDITOR &gt; VIEWER</code> 4단계 역할 계층 RBAC 설계</li>
              <li>• SpEL <code className="text-violet-600 bg-violet-50 px-1 rounded text-xs font-mono">@PreAuthorize</code> 커스텀 평가기 — Redis 5분 TTL 캐시, 역할 변경 시 즉시 무효화</li>
            </ul>
          </div>
        </section>
        <section>
          <SectionTitle label="JWT 인증 흐름" />
          <MermaidDiagram chart={JWT_FLOW} title="POST /login → POST /refresh 시퀀스" accentClass="text-violet-600" />
        </section>
      </div>
    ),
  },
  {
    label: '온보딩 & 온보딩 흐름',
    fullWidth: true, wide: true,
    content: (
      <div className="grid grid-cols-2 gap-8">
        <section>
          <SectionTitle label="본인 기여 — 온보딩·모듈 설계" />
          <div className="space-y-3">
            <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
              <h3 className="text-slate-800 text-sm font-bold mb-2">멀티테넌트 온보딩 (butterfly-tenant)</h3>
              <ul className="text-slate-600 text-sm leading-relaxed space-y-2">
                <li>• 기업 신청 → 관리자 승인 → companyAuthNo 발급 → OWNER 초대 링크(24시간 TTL) 이메일 발송 2단계 온보딩 플로우 전체 구현</li>
                <li>• 팀원 가입 신청 → OWNER 승인/거절, 역할 변경, 멤버 제거 전 라이프사이클 구현</li>
                <li>• <code className="text-violet-600 bg-violet-50 px-1 rounded text-xs font-mono">@SQLRestriction</code> 기반 소프트 딜리트 자동 적용 (JPA 전역 필터)</li>
                <li>• Row-level 격리: 전 도메인 projectId 기반 쿼리 필터 + @PreAuthorize 인가 이중 방어</li>
              </ul>
            </div>
            <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
              <h3 className="text-slate-800 text-sm font-bold mb-2">모듈 설계</h3>
              <ul className="text-slate-600 text-sm leading-relaxed space-y-2">
                <li>• <code className="text-violet-600 bg-violet-50 px-1 rounded text-xs font-mono">CompanyAuthPort</code> + <code className="text-violet-600 bg-violet-50 px-1 rounded text-xs font-mono">CompanyAuthAdapter</code> Port/Adapter 패턴으로 모듈 간 순환 의존 제거</li>
                <li>• <code className="text-violet-600 bg-violet-50 px-1 rounded text-xs font-mono">ApiKeyValidator</code> SPI 동일 구조 적용</li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <SectionTitle label="멀티테넌트 온보딩 흐름" />
          <MermaidDiagram chart={ONBOARDING_FLOW} title="기업 신청 → OWNER 활성화 시퀀스" accentClass="text-violet-600" />
        </section>
      </div>
    ),
  },
  {
    label: '문제 해결',
    fullWidth: true,
    content: (
      <section>
        <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-6 space-y-5">
          <h3 className="text-slate-800 text-sm font-semibold">Refresh Token 레이스 컨디션</h3>
          <div><p className="text-slate-500 text-xs mb-1">문제</p><p className="text-slate-600 text-sm">동시 요청 시 두 요청 모두 갱신에 성공하는 레이스 컨디션 취약점</p></div>
          <FlowPipeline title="취약한 구조 (GET + DELETE 분리)" accentClass="text-violet-600" rows={[
            { prefix: '요청 A', steps: ['GET', '토큰 읽기 성공'], outcome: '새 토큰 발급', outcomeStatus: 'danger' },
            { prefix: '요청 B', steps: ['GET', '토큰 읽기 성공'], outcome: '새 토큰 발급', outcomeStatus: 'danger' },
          ]} note="둘 다 유효한 새 토큰 발급 → 토큰 탈취 취약" />
          <div><p className="text-slate-500 text-xs mb-1">원인</p><p className="text-slate-600 text-sm">Redis GET + DELETE 분리 시 두 요청 사이에 원자성 보장 안 됨</p></div>
          <FlowPipeline title="해결: GETDEL 원자 연산" accentClass="text-violet-600" rows={[
            { prefix: '요청 A', steps: ['GETDEL', '토큰 반환 + 즉시 삭제'], outcome: '새 토큰 발급', outcomeStatus: 'success' },
            { prefix: '요청 B', steps: ['GETDEL', 'null 반환'], outcome: '401 차단', outcomeStatus: 'danger' },
          ]} />
          <div><p className="text-slate-500 text-xs mb-1">효과</p><p className="text-slate-600 text-sm">토큰 탈취 후 재사용 감지 및 즉시 세션 무효화 보장</p></div>
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
              <li>• 보안은 기능이 아니라 설계 단계에서부터 고려해야 한다는 것을 직접 경험</li>
              <li>• Redis 원자 연산(GETDEL, SETNX)이 분산 환경에서 동시성 문제를 해결하는 핵심 수단임을 체득</li>
              <li>• Port/Adapter 패턴이 모듈 간 의존 방향을 강제하는 데 얼마나 효과적인지 실감</li>
            </ul>
          </div>
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">어려웠던 점</h3>
            <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
              <li>• 멀티테넌트 격리를 서비스·DB·인가 레이어 세 곳에서 일관성 있게 유지하는 것</li>
              <li>• Spring Security 필터 체인에서 JWT 인증과 API Key 인증을 공존시키는 설정</li>
              <li>• 테스트 환경에서 Redis 원자성을 실제로 검증할 수 있는 통합 테스트 시나리오 작성</li>
            </ul>
          </div>
          <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
            <h3 className="text-slate-800 text-sm font-bold mb-2">개선 사항</h3>
            <ul className="text-slate-600 text-sm leading-relaxed space-y-1.5">
              <li>• API Key 발급 시 키 로테이션 Grace Period 지원 필요</li>
              <li>• 분산 노드 환경에서 역할 캐시 동기화 전략 개선 필요</li>
            </ul>
          </div>
        </div>
      </section>
    ),
  },
];

export function Butterfly() {
  return <SlideShow slides={slides} />;
}
