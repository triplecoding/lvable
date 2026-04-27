import { articles, calculators, impaCodes, maritimeNews, pdfs, ports, slides } from '@/lib/mockData';
import { ArticleModel, CalculatorModel, ImpaCodeModel, NewsModel, PdfModel, PortModel, SlideModel } from './models';

export async function seedIfEmpty() {
  const [slideCount, articleCount, pdfCount, calculatorCount, portCount, newsCount, impaCount] = await Promise.all([
    SlideModel.countDocuments(),
    ArticleModel.countDocuments(),
    PdfModel.countDocuments(),
    CalculatorModel.countDocuments(),
    PortModel.countDocuments(),
    NewsModel.countDocuments(),
    ImpaCodeModel.countDocuments()
  ]);

  if (!slideCount) await SlideModel.insertMany(slides);
  if (!articleCount) await ArticleModel.insertMany(articles);
  if (!pdfCount) await PdfModel.insertMany(pdfs.map((p, idx) => ({ ...p, featured: idx === 0 })));
  if (!calculatorCount) await CalculatorModel.insertMany(calculators);
  if (!portCount) await PortModel.insertMany(ports);
  if (!newsCount) await NewsModel.insertMany(maritimeNews);
  if (!impaCount) await ImpaCodeModel.insertMany(impaCodes);
}
