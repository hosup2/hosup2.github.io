import { InfoCard } from '../components/ui/InfoCard';
import { SectionTitle } from '../components/ui/SectionTitle';
import { SkillBar } from '../components/ui/SkillBar';

export function Intro() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-8">

        <section className="flex items-center gap-10 py-16 border-b border-[var(--bd)]">
          <img src="./pic.jpg" alt="김동현"
            className="w-32 h-32 rounded-full object-cover object-top shrink-0 border-2 border-slate-200" />
          <div>
            <p className="text-xs tracking-widest text-indigo-600 uppercase mb-3">INTRO</p>
            <h1 className="text-4xl font-bold leading-tight mb-3">
              안녕하세요,{' '}
              <span className="bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text">
                김동현입니다.
              </span>
            </h1>
            <div className="w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-sky-400 mb-4" />
            <p className="text-slate-500 text-sm leading-relaxed">
              백엔드를 주력으로, 서비스 전체 흐름을 함께 고민하는 개발자입니다.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['백엔드개발자', '인증·보안설계', '풀스택'].map(kw => (
                <span key={kw} className="text-xs px-2.5 py-1 rounded-full border font-medium text-indigo-600 bg-indigo-50 border-indigo-200">#{kw}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 border-b border-[var(--bd)]">
          <SectionTitle label="자기소개" />
          <p className="text-slate-600 text-sm leading-loose">
            주력은 백엔드이며, 프론트엔드 경험을 통해 서비스 전체 흐름을 함께 이해하는 개발자입니다.
            물리학 전공으로 쌓은 문제 분석력을 바탕으로, 복잡한 시스템을 단순하고 명확하게 설계하는 것을 추구합니다.
          </p>
          <p className="text-slate-600 text-sm leading-loose mt-3">
            설계한 구조가 운영 환경에서 예상대로 동작하는 순간,
            그리고 작은 선택 하나가 서비스 경험 전체를 바꾸는 순간이 좋습니다.
            문제의 본질을 파고들어 구조적으로 해결했을 때의 성취감이 개발을 계속하게 만드는 이유입니다.
          </p>
        </section>

        <section className="py-12 border-b border-[var(--bd)]">
          <SectionTitle label="주요 기술" />
          <div className="flex flex-col gap-3">
            <SkillBar name="Python / Django" level={3} variant="blue"
              note="언어 기초 · 알고리즘 · Django REST Framework"
              capabilities={[
                'Python 기초 문법·자료구조·알고리즘 구현 가능 (백준·SWEA 문제 풀이)',
                'Django REST Framework로 API 서버 설계·ORM·Serializer 활용 가능',
                'AI·ML 기초 실습 및 공통 프로젝트 백엔드 참여 경험',
              ]} />
            <SkillBar name="Java / Spring Boot" level={2} variant="blue"
              note="Spring Security · JPA · Flyway · Redis"
              capabilities={[
                'Spring Security 기반 JWT 인증·인가 필터 체인 설계 및 구현 가능',
                'RBAC 4단계 역할 계층 설계 및 @PreAuthorize 커스텀 평가기 작성 가능',
                'JPA 엔티티 관계 모델링, Flyway DB 마이그레이션 관리 가능',
                '대규모 트래픽 처리·쿼리 최적화 등 심화 영역은 추가 학습 필요',
              ]} />
            <SkillBar name="React / Next.js" level={3} variant="indigo"
              note="React 19 · Next.js App Router · TanStack Query · Zustand"
              capabilities={[
                'TanStack Query query key 전략 설계, 낙관적 업데이트, 무한 스크롤 구현 가능',
                'Zustand store 분리·partialize persist, 커스텀 이벤트 기반 상태 동기화 가능',
                'Next.js App Router 구조 설계, RSC/Client Component 경계 관리 가능',
                'HttpOnly Cookie 기반 SSR 인증 구조 등 심화 SSR 설계는 경험 보완 중',
              ]} />
            <SkillBar name="TypeScript" level={3} variant="indigo"
              note="제네릭 · 유틸리티 타입 · 도메인 타입 설계"
              capabilities={[
                'API 요청·응답 타입 도메인별 분리, Adapter 패턴으로 UI 모델 격리 가능',
                '제네릭·유틸리티 타입(Partial, Pick, Record 등) 활용 가능',
                '복잡한 조건부 타입·infer 기반 타입 추론 시스템은 추가 경험 필요',
              ]} />
            <SkillBar name="MySQL / Redis" level={2} variant="blue"
              note="인덱스 설계 · Refresh Token Rotation · 원자 연산"
              capabilities={[
                'Redis GETDEL 원자 연산으로 Refresh Token Rotation 레이스 컨디션 방어 구현 가능',
                'Redis TTL 기반 블랙리스트, Rate Limiting, 캐시 무효화 패턴 적용 가능',
                '기본 인덱스 설계 가능, 복잡한 실행 계획 분석·쿼리 튜닝은 추가 학습 필요',
              ]} />
          </div>
        </section>

        <section className="py-12 border-b border-[var(--bd)]">
          <SectionTitle label="기본 정보" />
          <div className="grid grid-cols-3 gap-3">
            <InfoCard label="생년월일">1999.11.16</InfoCard>
            <InfoCard label="희망 직무">백엔드 개발자</InfoCard>
            <InfoCard label="자격증">SQLD<br />2025.04.04</InfoCard>
            <InfoCard label="이메일">
              <a href="mailto:dosl196122@naver.com" className="hover:text-indigo-600 transition-colors">
                dosl196122@naver.com
              </a>
            </InfoCard>
            <InfoCard label="학력">국립 공주대학교<br />데이터정보물리학과<br />2018.03 ~ 2025.02</InfoCard>
            <InfoCard label="경력">삼성청년소프트웨어아카데미<br />SSAFY 14기<br />2025.07 ~ 2026.06</InfoCard>
          </div>
        </section>

        <section className="py-12">
          <a href="https://github.com/hosup2" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-indigo-300 text-indigo-600 text-sm rounded-lg hover:bg-indigo-50 transition-colors">
            GitHub ↗
          </a>
        </section>
      </div>
    </div>
  );
}
