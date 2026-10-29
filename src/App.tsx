import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Layout } from "@/components/Layout";
import { AboutPage } from "@/pages/About";
import { AskAmyPage } from "@/pages/AskAmy";
import { BlogPage } from "@/pages/Blog";
import { BlogPostPage } from "@/pages/BlogPost";
import { HomePage } from "@/pages/Home";
import { NotFoundPage } from "@/pages/NotFound";
import { PrivacyPage } from "@/pages/Privacy";
import { ResultPage } from "@/pages/Result";

const QuizPage = lazy(() => import("@/pages/Quiz").then((mod) => ({ default: mod.QuizPage })));

export function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/quiz">
          <Suspense fallback={<p className="px-5 py-16 text-center">Opening the quiz…</p>}>
            <QuizPage />
          </Suspense>
        </Route>
        <Route path="/result" component={ResultPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/ask-amy" component={AskAmyPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}
