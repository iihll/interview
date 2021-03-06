## 什么是 XSS 攻击
Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获得用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。  
XSS 的本质是：恶意代码未经过滤，与网站正常代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。
## XSS 分类
根据攻击来源，XSS 攻击可分为存储型、反射型和 DOM 型三种。
## 三种攻击类型的区别
1. 反射型和存储型的区别是：存储型的恶意代码存放在数据库里，反射型的恶意代码存在 URL 里。
2. DOM 型和其他两种的区别：DOM 型攻击中，取出和执行恶意代码有浏览器端完成，属于前端 JS 自身的安全漏洞，而其他两种都属于服务端的安全漏洞
## 如何防范 XSS 攻击
1. 输入过滤仅在明确的输入类型下去使用
2. 防止浏览器执行恶意代码
  * 改为纯前端渲染，把代码和数据分隔开
  * 对 HTML 做充分转义
3. Content Security Policy
 > 严格的 CSP 在 XSS 的防范中可以起到以下的作用：

1. 禁止加载外域代码，防止复杂的攻击逻辑。
2. 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域。
3. 禁止内联脚本执行（规则较严格，目前发现GitHub 使用）。
4. 禁止未授权的脚本执行（新特性，Google Map 移动版在使用）。
5. 合理使用上报可以及时发现 XSS，利于尽快修1.复问题。
4. 前端 JS 代码的严谨性，避免 v-html、内联事件监听、a 标签的 href、eval、setTimeout、setInterval 等将不可信的数据拼接到字符串中传递给这些 API。

tcp chang lian jie
jizhu gundong gaodu
llru quan cheng
