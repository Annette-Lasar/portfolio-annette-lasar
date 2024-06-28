import { MenuToTranslate } from './menu-to-translate.interface';
import { HeroToTranslate } from './hero-to-translate.interface';
import { AboutToTranslate } from './about-to-translate.interface';
import { SkillsToTranslate } from './skills-to-translate.interface';
import { PortfolioToTranslate } from './portfolio-to-translate.interface';
import { ContactToTranslate } from './contact-to-translate.interface';
import { FooterToTranslate } from './footer-to-translate.interface';

export interface Translations {
  menu: MenuToTranslate;
  hero: HeroToTranslate;
  about: AboutToTranslate;
  skills: SkillsToTranslate;
  portfolio: PortfolioToTranslate;
  contact: ContactToTranslate;
  footer: FooterToTranslate;
}