# TODO — משימות שהושלמו
## TimeUp Video Advertisement | EX06

## תכנון ותסריט

- [x] הגדרת מטרת המוצר וקהל מטרה (PRD)
- [x] כתיבת script.json עם 3 סצנות
- [x] כתיבת screenplay.fountain לתיאור התוכן
- [x] כתיבת lyric/פסקול לפרסומת
- [x] תכנון תזמון מדויק לכל סצנה (PLAN)

## הקמת הפרויקט

- [x] הרצת `npx create-video@latest` להקמת שלד Remotion
- [x] הוספת Claude Skill ל-Remotion (`npx skills add remotiondev/skills`)
- [x] התקנת תלויות (`npm install`)
- [x] בדיקת הרצה ראשונית (`npx remotion studio`)

## בניית הקומפוזיציה

- [x] בניית סצנה 1 - פתיח (שעון, התראות, אנימציית כניסה)
- [x] בניית סצנה 2 - הבעיה (לוח שנה, כרטיסי משימות, staggered entrance)
- [x] בניית סצנה 3 - הפתרון (ממשק TimeUp, reveal לוגו, CTA)
- [x] כתיבת פרומפט מפורט ל-Gemini לכל סצנה
- [x] שילוב פלטת צבעים עקבית בין הסצנות
- [x] הוספת אנימציות spring ו-crossfade בין סצנות

## תיקונים טכניים

- [x] תיקון כיווניות RTL לכתוביות עבריות (`direction: rtl`, `text-align: right`)
- [x] תיקון פיצול שגוי של כתוביות למילים בודדות
- [x] מעבר למודל Gemini Pro לאחר מכסת Flash שהסתיימה
- [x] תיקון שגיאת "Composition not found" (עדכון שם ל-`TimeUpCommercial`)
- [x] הרצת בדיקת TypeScript (`npx tsc --noEmit`) ותיקון שגיאות

## רינדור ובדיקה

- [x] רינדור קובץ MP4 סופי (`npx remotion render`)
- [x] בדיקת אורך הוידאו (60 שניות בדיוק)
- [x] בדיקת תקינות הכתוביות בעברית
- [x] בדיקת זרימת האנימציות בין הסצנות
- [x] בדיקת קריאות ה-CTA בסיום

## תיעוד

- [x] כתיבת README.md מלא ומפורט
- [x] כתיבת PRD.md תמציתי (~150 מילה)
- [x] כתיבת PLAN.md עם תזמון וסדר עבודה
- [x] כתיבת TODO.md (מסמך זה)
- [x] העברת script.json, screenplay.fountain, ו-lyric לתיקיית הפרויקט הראשית

## העלאה ל-GitHub

- [x] אתחול git (`git init`)
- [x] הוספת קבצים (`git add .`)
- [x] יצירת commit (`git commit -m "Final EX06 submission"`)
- [x] יצירת repository ציבורי ב-GitHub
- [x] חיבור remote (`git remote add origin ...`)
- [x] דחיפה סופית (`git push -u origin main`)

## בדיקה סופית לפני הגשה

- [x] פתיחת קישור הריפו בגלישה פרטית לאימות שהוא ציבורי
- [x] אימות שה-README מוצג נכון בעמוד הראשי
- [x] אימות שקובץ `output/final.mp4` נגיש בריפו
- [x] הגשת הקישור בפורטל הקורס