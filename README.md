
# 星命心旅 (Stellar Mind) - 部署指南

这是一个基于 React 和 Google Gemini API 开发的沉浸式命理分析 H5 应用。

## 如何发布链接？

### 方式一：Vercel 部署 (最推荐)
1. **上传代码**：将所有文件上传到您的 GitHub 仓库。
2. **连接 Vercel**：在 Vercel 中导入该仓库。
3. **设置环境变量**：在 Vercel 控制台的 **Environment Variables** 中添加：
   - `API_KEY`: 您的 Gemini API Key。
4. **部署完成**：您将获得一个 `.vercel.app` 结尾的链接，任何人点击即可使用，**无需登录 Google 账号**。

### 方式二：Netlify 部署
1. 同样上传至 GitHub。
2. 在 Netlify 中关联仓库。
3. 在 **Site settings > Build & deploy > Environment variables** 中设置 `API_KEY`。

## 安全建议
由于 API Key 部署在前端，建议您在 [Google AI Studio](https://aistudio.google.com/) 的 API Key 设置中：
- **设置限额**：防止非预期的高额调用。
- **域名限制**：设置仅允许您的部署域名访问。
