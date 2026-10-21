import { promises as fs } from 'fs';
import path from 'path';
import { HomePage } from '@/components/HomePage';

export default async function Home() {
  const htmlPath = path.join(process.cwd(), 'public/code9-home.html');
  const htmlContent = await fs.readFile(htmlPath, 'utf-8');

  // Extract the body content
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/);
  const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;

  // Extract styles from head
  const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  const styles = styleMatch ? styleMatch[1] : '';

  // Extract scripts
  const scriptMatch = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  const scripts = scriptMatch ? scriptMatch[1] : '';

  return <HomePage styles={styles} bodyContent={bodyContent} scripts={scripts} />;
}
