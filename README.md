# [mdtex-parser](https://github.com/BNZinc/mdtex-parser)

## 개요

mdtex-parser는 TeX 문법이 혼합된 Markdown 문서를 받아, LaTeX 인라인 구문, LaTeX 블록 구문, Markdown 으로 판단하고, 잘못 판단된 부분을 확인해서 올바른 분류를 적용하기 위한, 구문 보정 프로젝트입니다.

## 목표

- LaTeX 문법이 포함된 markdown 기반 문서를 받아 AS-IS 구분자와 내부 내용을 분석합니다.
- 분석된 내부 내용에 따라 잘못 표현되었을것으로 유추되는 구문을 올바른 구문으로 변경합니다

## 사용 예시

`getCorrectedContents`는 텍스트와 LaTeX 수식이 포함된 문자열을 교정하는 함수입니다.

```typescript
import { getCorrectedContents } from "@bnz-org/mdtex-parser";

// LaTeX 수식이 포함된 텍스트 교정
const text = 'inline plus and text fraction$1+1$\\frac{1}{2}';
const corrected = getCorrectedContents(text);
console.log(corrected);
//"inline plus and text fraction$1+1$ $\\frac{1}{2}$\n\n"
```

### 수식 처리 규칙

- LaTeX 수식은 `$...$` 혹은 `$$...$$` 으로 감싸야 합니다
- `$...$` 는 텍스트와 함께 사용할 수 있는 인라인 수식을 표시합니다.
- `$$...$$` 는 여러 해를 표시하는 등 하나의 블록을 구성하는 begin 을 사용할 때 사용합니다.
- `getCorrectedContents` 함수는 입력을 분석하고 어떤 부분이 인라인 수식이거나 블록 수식으로 판단되는데 적절한 구분자가 없는경우 구분자를 만들거나 지웁니다.
- 결과물에는 개행 문자가 두번 붙습니다.

## 용어

**Tex**: 복잡한 수식을 표현하기 위한 언어입니다.

**LaTeX**: Tex 문법에 매크로 기능을 추가하여 수식을 더 편리하게 작성할 수 있도록 한 구현체입니다.

**LaTeX 인라인**: LaTeX로 수학 기호를 표현하기 위한 구문입니다. 한 줄에서 일반 텍스트처럼 사용할 수 있습니다.

**LaTeX 블록**: LaTeX로 수학 기호를 표시하되, 한줄 이상의 여러 줄로 표시해야 하는 경우 사용하는 구문입니다.

**Markdown**: 문서를 텍스트로 마크업할 수 있도록 하는 서식 언어입니다.

**구문**: 이 프로젝트 내부에서 문서를 나누는 단위입니다. $a+b$ 라고 하면 a+b 라는 구문으로 나눕니다. "문제$a+b$는?" 라는 문서를 입력받으면 "문제", "a+b", "는?" 과 같은 단위로 나눕니다. 각 마크다운, LaTeX Inline, 마크다운 으로 구분하므로 의도에 맞추어 결과물을 표시할 수 있습니다.

## 내부 구조

크게 분석기와 보정기로 나눕니다.

### 파서

파서는 내부 구문의 타입을 얻어내고, 구문의 본문을 통해 필요한 속성을 생성합니다. 예를 들어 개행이 있는지, TeX 구문이 포함되어있는지, Block 시작인지 등 구문의 종류를 규정하고 본문을 분석해서 그 속성을 추가합니다.

### 보정기

보정기는 파서가 분석한 결과를 토대로 "블록 범위 검사" 와 "마크다운으로 분류된 수식 구문" 과 같은 오류를 확인하고 결과에 맞추어 변환합니다. 파싱 된 결과물은 createOverridedContent 메서드를 통해 다른 타입으로 변경하면서 기록을 위해 원본을 함께 멤버 변수에 담습니다.

## Credit

Designed by Young Min 'Matthew' Kim

Implements By. Young Min 'Matthew' Kim

## 라이선스

이 프로젝트는 Apache License 2.0 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
