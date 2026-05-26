import { InfoCard } from '../components/ui/InfoCard';
import { SectionTitle } from '../components/ui/SectionTitle';
import { SkillBar } from '../components/ui/SkillBar';

export function Intro() {
  return (
    <div className="px-12 py-10 max-w-3xl">
      {/* Hero */}
      <div className="mb-14">
        <p className="text-xs tracking-widest text-sky-400 uppercase mb-4">INTRO</p>
        <h1 className="text-5xl font-bold text-slate-50 leading-tight mb-4">
          안녕하세요,
          <br />
          김동현입니다.
        </h1>
        <div className="w-12 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-400 mb-6" />
        <p className="text-slate-400 text-base leading-relaxed">
          안정성과 확장성을 함께 고민하는 풀스택 개발자입니다.
        </p>
      </div>

      {/* 자기소개 */}
      <section className="mb-12">
        <SectionTitle label="자기소개" />
        <p className="text-slate-400 text-sm leading-relaxed">
          백엔드 설계부터 프론트엔드 구현, 인프라 배포까지 서비스 전 과정을 경험해온 개발자입니다.
          Spring Boot 기반 멀티테넌트 SaaS 플랫폼에서 인증·인가 시스템을 설계하며 보안 취약점을 구조적으로
          방어하는 방법을 익혔습니다. Refresh Token Rotation과 Redis 원자 연산을 결합해 동시성 문제를
          해결하는 등, 코드 한 줄의 선택이 서비스 안정성에 직결된다는 것을 몸으로 배웠습니다.
          물리학 전공을 통해 길러진 문제 분석력을 바탕으로, 복잡한 시스템을 단순하고 명확하게 설계하는 것을 추구합니다.
        </p>
      </section>

      {/* 개발이 좋은 이유 */}
      <section className="mb-12">
        <SectionTitle label="개발이 좋은 이유" />
        <p className="text-slate-400 text-sm leading-relaxed">
          내가 작성한 코드가 실제 사용자의 문제를 해결하는 순간이 좋습니다.
          설계 단계에서 고민한 구조가 운영 환경에서 예상대로 동작할 때의 만족감, 그리고 예상치 못한 문제를
          파고들어 원인을 찾아냈을 때의 성취감이 개발을 계속하게 만드는 이유입니다.
          특히 보안과 시스템 설계처럼 눈에 잘 보이지 않는 부분을 꼼꼼하게 다루는 작업에서 개발자로서의 책임감을 느낍니다.
        </p>
      </section>

      {/* 주요 기술 */}
      <section className="mb-12">
        <SectionTitle label="주요 기술" />
        <div className="flex flex-col gap-4">
          <SkillBar name="Java / Spring Boot" level={3} variant="blue" note="Spring Security, JPA, 멀티모듈" />
          <SkillBar name="React / TypeScript" level={4} variant="indigo" note="Vite, React Query, Zustand" />
          <SkillBar name="MySQL / Redis" level={3} variant="blue" note="인덱스 설계, 캐시 전략, 원자 연산" />
        </div>
      </section>

      {/* 기본 정보 */}
      <section className="mb-12">
        <SectionTitle label="기본 정보" />
        <div className="grid grid-cols-2 gap-3">
          <InfoCard label="생년월일">1999.11.16</InfoCard>
          <InfoCard label="희망 직무">풀스택 개발자</InfoCard>
          <InfoCard label="이메일">dosl196122@naver.com</InfoCard>
          <InfoCard label="전화번호">010-5646-7557</InfoCard>
          <InfoCard label="학력">
            국립 공주대학교
            <br />
            데이터정보물리학과
            <br />
            2018.03 ~ 2025.02
          </InfoCard>
          <InfoCard label="경력">
            삼성청년소프트웨어아카데미
            <br />
            SSAFY 14기
            <br />
            2025.07 ~ 2026.06
          </InfoCard>
        </div>
      </section>

      {/* GitHub */}
      <section>
        <a
          href="https://github.com/hosup2"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-sky-400/40 text-sky-400 text-sm rounded hover:bg-sky-400/10 transition-colors"
        >
          GitHub ↗
        </a>
      </section>
    </div>
  );
}
