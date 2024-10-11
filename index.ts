import { getContentImporter } from "./src/content-import/content-importer";

function main() {
  console.log(
    getContentImporter(`실수 t에 대하여 두 함수
$f(x)=(x-t)^2-2$, $g(x)=\\begin{cases} -x-1 & (x \\le 1) \\\\ x+1 & (x > 1) \\end{cases}$
의 그래프가 만나는 서로 다른 점의 개수를 $h(t)$라 할 때,
함수 $h(t)$를 $t$의 값의 범위에 따라 구하고 함수 $h(t)$가
$t=a$에서 불연속이 되는 모든 $a$의 값을 구하시오.`)
  );
}

main();
