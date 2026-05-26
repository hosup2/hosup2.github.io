import { FlowBlock } from '../components/ui/FlowBlock';
import { ProjectHeader } from '../components/ui/ProjectHeader';
import { SectionTitle } from '../components/ui/SectionTitle';
import { TechBadge } from '../components/ui/TechBadge';

const JWT_FLOW = `Client          butterfly-api       Redis              DB
  │                   │               │                 │
  │── POST /login ───▶│               │                 │
  │                   │── 비밀번호 검증 ────────────────▶│
  │                   │◀──────────────────────────── OK │
  │                   │── SET refresh_token (7d) ──▶│   │
  │◀── access(30m) + refresh(7d) ────│               │   │
  │                   │               │                 │
  │── POST /refresh ─▶│               │                 │
  │                   │── GETDEL refresh_token ───▶│    │
  │                   │◀────────── 토큰 반환 + 삭제 │    │
  │                   │── SET 새 refresh_token ────▶│   │
  │◀── 새 access + 새 refresh ────────│               │   │`;

const ONBOARDING_FLOW = `기업 담당자      Admin         butterfly-api        Redis / DB
    │              │                 │                    │
    │─ 신청서 제출 ─────────────────▶│                    │
    │              │                 │─── 신청서 저장 ────▶│
    │              │─ 승인 처리 ─────▶│                    │
    │              │                 │─ OWNER 생성 ───────▶│
    │              │                 │─ companyAuthNo 발급 ▶│
    │              │                 │─ 초대링크 SET(24h) ─▶│
    │◀─ 초대 이메일 (링크 24h TTL) ───│                    │
    │─ 비밀번호 설정 ────────────────▶│                    │
    │                                │─ OWNER ACTIVE ─────▶│
    │◀────────────── 로그인 가능 ─────│                    │`;

const RACE_VULNERABLE = `요청 A ── GET ──▶ 토큰 읽기 성공
요청 B ── GET ──▶ 토큰 읽기 성공  ← 둘 다 유효한 새 토큰 발급 (취약)`;

const RACE_FIXED = `요청 A ── GETDEL ──▶ 토큰 반환 + 즉시 삭제 → 새 토큰 발급
요청 B ── GETDEL ──▶ null 반환 → 401 차단`;

const STACK_GROUPS = [
  { label: '프론트엔드', variant: 'indigo' as const, badges: ['React 18', 'TypeScript 5.6', 'Vite 5', 'Zustand', 'React Query'] },
  { label: '백엔드', variant: 'blue' as const, badges: ['Java 21', 'Spring Boot 3.5', 'Spring Security', 'JPA', 'Flyway'] },
  { label: '인프라', variant: 'default' as const, badges: ['Docker', 'Kubernetes (K3s)', 'Kustomize', 'ArgoCD', 'GitLab CI/CD'] },
  { label: 'DB / 캐시', variant: 'blue' as const, badges: ['MySQL 8.0', 'Redis 7', 'ClickHouse 24.8'] },
  { label: '메시지 브로커', variant: 'default' as const, badges: ['Apache Kafka 3.7'] },
  { label: '모니터링', variant: 'default' as const, badges: ['Prometheus', 'Grafana', 'Loki'] },
];

export function Butterfly() {
  return (
    <div className="px-12 py-10 max-w-3xl">
      <ProjectHeader
        no="PROJECT 01"
        name="Butterfly"
        description="고객 행동 수집·세그먼트·캠페인·성과 분석을 하나로 통합한 B2B 멀티테넌트 CRM SaaS 플랫폼"
        period="2025.04 ~ 2025.05 (6주)"
        team="6인 팀"
        role="Backend — 인증·인가 모듈, 멀티테넌트 온보딩 모듈"
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

      {/* 스크린샷 */}
      <section className="mb-12">
        <SectionTitle label="스크린샷" />
        <div className="grid grid-cols-2 gap-4">
          <img
            src="./screenshots/butterfly-campaign-detail.png"
            alt="캠페인 상세"
            className="rounded-lg border border-[#1e3a5f] w-full"
          />
          <img
            src="./screenshots/butterfly-campaign-preview.png"
            alt="캠페인 프리뷰"
            className="rounded-lg border border-[#1e3a5f] w-full"
          />
          <img
            src="./screenshots/butterfly-architecture.png"
            alt="아키텍처"
            className="rounded-lg border border-[#1e3a5f] w-full col-span-2"
          />
        </div>
      </section>

      {/* JWT 흐름 */}
      <section className="mb-12">
        <SectionTitle label="JWT 인증 흐름" />
        <FlowBlock title="POST /login → POST /refresh 시퀀스">{JWT_FLOW}</FlowBlock>
      </section>

      {/* 온보딩 흐름 */}
      <section className="mb-12">
        <SectionTitle label="멀티테넌트 온보딩 흐름" />
        <FlowBlock title="기업 신청 → OWNER 활성화 시퀀스">{ONBOARDING_FLOW}</FlowBlock>
      </section>

      {/* 본인 기여 */}
      <section className="mb-12">
        <SectionTitle label="본인 기여 상세" />
        <div className="space-y-8">
          <div>
            <h3 className="text-sky-400 text-sm font-semibold mb-3">인증·인가 (butterfly-auth)</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• JWT Access Token (30분, 프로젝트 스코프) / Refresh Token (7일, 멤버 스코프) 이중 구조 설계 및 구현</li>
              <li>• Refresh Token Rotation — Redis <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">GETDEL</code> 원자 명령으로 동시 요청 레이스 컨디션 방어</li>
              <li>• JWT 블랙리스트 (<code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">auth:blacklist:{'{jti}'}</code>) — 로그아웃 토큰 Redis 즉시 차단</li>
              <li>• 이메일 인증 코드 (6자리, 5분 TTL) 기반 회원가입 2단계 인증 게이트</li>
              <li>• SDK용 API Key 인증 (<code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">pk_live_</code> 형식, SHA-256 해시 저장) + Rate Limiting (429 + Retry-After)</li>
              <li>• <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">ADMIN &gt; OWNER &gt; EDITOR &gt; VIEWER</code> 4단계 역할 계층 RBAC 설계</li>
              <li>• SpEL <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">@PreAuthorize</code> 커스텀 평가기 — Redis 5분 TTL 캐시, 역할 변경 시 즉시 무효화</li>
            </ul>
          </div>
          <div>
            <h3 className="text-indigo-400 text-sm font-semibold mb-3">멀티테넌트 온보딩 (butterfly-tenant)</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• 기업 신청 → 관리자 승인 → companyAuthNo 발급 → OWNER 초대 링크(24시간 TTL) 이메일 발송 2단계 온보딩 플로우 전체 구현</li>
              <li>• 팀원 가입 신청 → OWNER 승인/거절, 역할 변경, 멤버 제거 전 라이프사이클 구현</li>
              <li>• <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">@SQLRestriction</code> 기반 소프트 딜리트 자동 적용 (JPA 전역 필터)</li>
              <li>• Row-level 격리: 전 도메인 projectId 기반 쿼리 필터 + @PreAuthorize 인가 이중 방어</li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-300 text-sm font-semibold mb-3">모듈 설계</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2">
              <li>• <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">CompanyAuthPort</code> + <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">CompanyAuthAdapter</code> Port/Adapter 패턴으로 모듈 간 순환 의존 제거</li>
              <li>• <code className="text-sky-300 bg-[#0a1628] px-1 rounded text-xs font-mono">ApiKeyValidator</code> SPI 동일 구조 적용</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 문제 해결 */}
      <section className="mb-12">
        <SectionTitle label="문제 해결 경험" />
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-6 space-y-5">
          <h3 className="text-slate-200 text-sm font-semibold">Refresh Token 레이스 컨디션</h3>
          <div>
            <p className="text-slate-500 text-xs mb-1">문제</p>
            <p className="text-slate-400 text-sm">동시 요청 시 두 요청 모두 갱신에 성공하는 레이스 컨디션 취약점</p>
          </div>
          <FlowBlock title="취약한 구조 (GET + DELETE 분리)">{RACE_VULNERABLE}</FlowBlock>
          <div>
            <p className="text-slate-500 text-xs mb-1">원인</p>
            <p className="text-slate-400 text-sm">Redis GET + DELETE 분리 시 두 요청 사이에 원자성 보장 안 됨</p>
          </div>
          <FlowBlock title="해결: GETDEL 원자 연산">{RACE_FIXED}</FlowBlock>
          <div>
            <p className="text-slate-500 text-xs mb-1">효과</p>
            <p className="text-slate-400 text-sm">토큰 탈취 후 재사용 감지 및 즉시 세션 무효화 보장</p>
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
              <li>• 보안은 기능이 아니라 설계 단계에서부터 고려해야 한다는 것을 직접 경험</li>
              <li>• Redis 원자 연산(GETDEL, SETNX)이 분산 환경에서 동시성 문제를 해결하는 핵심 수단임을 체득</li>
              <li>• Port/Adapter 패턴이 모듈 간 의존 방향을 강제하는 데 얼마나 효과적인지 실감</li>
              <li>• Kafka 기반 이벤트 드리븐 아키텍처의 장점과 디버깅 복잡도 사이의 트레이드오프 이해</li>
            </ul>
          </div>
          <div>
            <h3 className="text-indigo-400 text-sm font-semibold mb-2">어려웠던 점</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-1.5">
              <li>• 멀티테넌트 격리를 서비스·DB·인가 레이어 세 곳에서 일관성 있게 유지하는 것</li>
              <li>• Spring Security 필터 체인에서 JWT 인증과 API Key 인증을 공존시키는 설정</li>
              <li>• 테스트 환경에서 Redis 원자성을 실제로 검증할 수 있는 통합 테스트 시나리오 작성</li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-400 text-sm font-semibold mb-2">개선 사항</h3>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-1.5">
              <li>• API Key 발급 시 키 로테이션 Grace Period 지원 필요</li>
              <li>• 분산 노드 환경에서 역할 캐시 동기화 전략 개선 필요</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
