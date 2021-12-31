# TypeChain
노마드 코더 강좌 실습 용 repository

강좌 링크(Lecture Link) : https://nomadcoders.co/typescript-for-beginners
수강 목적 : TypeScript를 통해  블록체인의 직접 구현 및 Bug-free Javascript Coding에 대한 기초 확립

**시작일(Start date) : 2021-12-27**

## 0. 프로젝트 초기화
- PC에 npm이 설치되어있어 npm init을 통하여 프로젝트를 초기화 하였음
    - yarn이 설치되어 있을경우 yarn으로 진행하면 됨
    - 이후 노트되는 내용은 npm을 기준으로 작성 됨

## 1. Typescript 세팅 (Setting Typescript Up)
- 아래 명령 사용하여 typescript 컴파일러를 설치해 주었음
```bash
npm install typescript
```
- 컴파일러 사용 시 아래 명령을 사용하여야 함
    - npx는 npm 패키지에서 바이너리를 실행하는 명령어
    - tsc는 typescript compiler
```bash
npx tsc
```
### 1.1. Typscript 설정 파일 생성
- Typescript 컴파일 시 사용되는 설정 파일(**tsconfig.json**)을 생성
- console에 hello를 출력하는 **index.ts** 생성
- 컴파일러 옵션과 컴파일 시 포함되는 파일, 미포함 되는 파일을 명시
    - compilerOptions
        - module (string)
            - 어떤 형태의 js를 사용할 것인지 명시
            - 본 실습에서는, `commonjs`(nodejs등에서 사용되는 일반 js)
        - target (string)
            - 어떤 버전을 사용할 것인지 
            - 본 실습에서는, `ES2015`
        - sourceMap (boolean)
            - source 맵 파일 생성 여부
    - include (object)
        - 컴파일 시 포함하는 파일들
        - 이번 실습에서는, `["index.ts"]`
    - exclude (object)
        - 컴파일 시 제외되는 파일들
        - 이번 실습에서는, `["node_modules"]` 
            - 컴파일 시에는 사용되지 않으므로 제외
### 1.2 코드 컴파일 및 실행
- 코드(**index.ts**)를 컴파일 하기 위해 터미널에 `npm tsc`를 입력하면 두개의 파일(**index.js**, **index.js.map**)이 생성됨
    - **index.js**는 컴파일 결과(commonjs)
    - **index.js.map**은 source map 생성 결과
- 터미널에 `node index.js`를 입력하면 생성된 javascript 코드가 실행됨
### 1.3 npm 명령을 통한 코드 컴파일 및 실행
- npm 명령을 통해 코드 컴파일 및 실행을 수행하기 위해서 **package.json**의 수정이 필요함
    - json의 script 부분에 `start`, `prestart`를 삽입
        - `prestart`에 정의된 스크립트는 start 명령 실행시 사전에 자동 실행됨
    - 삽입되는 scripts
``` json
{
...
"scripts": {
    "start": "node index.js",
    "prestart": "npx tsc"
  },
...
}
```
- 터미널에 `npm start`를 입력하면 컴파일이 진행된 후, 생성된 **index.js**를 실행하여 콘솔에 hello가 출력됨을 확인할 수 있었음   

2021-12-27 21:47   

---
## 2. first step with typescript
### 2.1 매개변수와 typescript 컴파일러 
- typescript는 개발자가 저지를 수 있는 멍청한 실수를 방지해줌
    - 함수 사용 시 매개 변수가 전달되지 않으면 `undefined` 발생
- 컴파일러는 선언된 함수를 사용할때 매개변수를 확인하여 의도하지 않은 매개변수 누락을 방지할 수 있도록 함
    - 모든 매개변수가 전달되지 않으면 컴파일시 오류 발생
    - 매개변수 바로 뒤에 ?를 붙이면 선택적으로 매개변수를 사용할 수 있도록 할 수 있음
    - 물음표가 붙은 매개변수는 전달되지 않더라도 컴파일러에서 오류가 발생하지 않음

> 실행 코드는 "2. first step with typescript" commit의 index.ts 참조

- 실행 결과
```bash
> npm start

> typechain@1.0.0 prestart C:\Users\shutt\git\TypeChain
> npx tsc


> typechain@1.0.0 start C:\Users\shutt\git\TypeChain
> node index.js

Hello yoursaint, you are 25, you are a male
```
## 2.1 types in typescript
- typescript는 변수의 type을 지정할 수 있음
    - 본 실습에서는 string과 number로 매개변수의type을 지정하였음
    - 매개변수가 전달될때 함수 선언 시 지정되었던 type과 다르면 error 발생
    - function이 return을 수행할 경우 함수 선언 시 지정되었던 return type과 다르면 error 발생

> execution code는 "types in typescript" commit의 index.ts 참조
## 번외. tsc-watch (실시간 컴파일)
- tsc-watch는 코드가 수정되어 저장될때마다 컴파일을 수행하고 그 결과를 실시간으로 작성자에게 보여주는 모듈
    - 매번 코드 작성시마다 컴파일할 필요가 없음
    - 기존 코드에서 아래와 같은 작업이 수행되어야 함

1. module install
    - npm을 사용하여 모듈을 인스톨함
    - devDependencies
```bash
npm install tsc-watch --also=dev
```
2. tsconfig modify
    - tsconfig.json의 compilerOptions와 include value를 수정
        - compilerOption에는 outDir key를 추가하여 컴파일 산출물이 해당 폴더에 저장될 수 있도록 함
            - 본 실습에서는 dist폴더를 생성하여 저장할 수 있도록 함
        - include를 수정하여 소스파일을 해당 폴더에서 불러올 수 있도록 함
            - 본 실습에서는 src 폴더를 생성하고 작성되는 ts 코드를 관리 하며, 해당 폴더의 ts파일을 포함하기 위해 `"src/**/*"`로 값을 변경

3. package.json modify
    - npm start를 통해 tsc-watch를 실행 할 수 있도록 key로 start 가지는 script를 변경
    - onSuccess는 저장 후 컴파일이 성공했을때 후에 전달되는 명령을 실행
        - 명령은 큰따옴표("")안에 기술되어야 함

```json
"scripts": {
    "start": "tsc-watch --onSuccess \" node dist/index.js\""
}
```       

4. excute command
    - npm start를 수행하면 다음과 같은 결과가 도출
    - save(ctrl + s)를 할 때마다 결과값이 terminal에 표시
    - exit은 ctrl + c
```bash
> npm start
오전 12:32:59 - Starting compilation in watch mode...


오전 12:33:02 - Found 0 errors. Watching for file changes.
Hello yoursaint, you are 25, you are a male
```
2021-12-30 00:37

---
## 3. Interfaces on typescript
- Typescript에서 매개변수로 object를 넘길 때 보다 object 구성요소의 type을 명확하게 하기위해 Interface를 사용할 수 있음
- Interface는 object의 구성요소와 해당 구성요소의 type을 사전 지정해 선언
- 선언된 Interface는 type 지정시에 `number`, `string` 등의 types와 같이 사용될 수 있음

```javascript
// interface 선언
interface human {
    name: string,
    age: number,
    gender: string
}

// interface를 type으로 사용
const sayHi = (person: human): string => {
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`
}
```
- 이와 같이 사용되는 inteface는 추후 실습할 블록체인 구현에서 한 블록의 데이터 구조를 나타내는데 사용될 수 있음