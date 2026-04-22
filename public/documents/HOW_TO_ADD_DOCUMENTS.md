# How to Add Documents

## Folder structure

```
public/
  documents/
    consultation/          ← drop consultation PDFs here
    allergy-safety/        ← drop allergy & safety PDFs here
```

## Steps to add a new document

1. Copy your PDF file into the correct folder above.
2. Open `src/products.ts`.
3. Add a new entry to the relevant array (`RESOURCES` or `ALLERGY_SAFETY_RESOURCES`).

### Example entry (free resource)

```ts
{
  id: 'my-new-guide',
  title: 'My New Guide',
  shortDescription: 'A short description shown on the card.',
  category: 'Consultation',
  documentType: 'PDF',
  isFree: true,
  requiresAccess: false,
  isUnlocked: true,
  previewAvailable: true,
  fileUrl: '/documents/consultation/my-new-guide.pdf',
  previewUrl: '/documents/consultation/my-new-guide.pdf',
  iconName: 'BookOpen'
}
```

### Example entry (paid resource)

```ts
{
  id: 'my-paid-guide',
  title: 'My Paid Guide',
  shortDescription: 'A short description shown on the card.',
  category: 'Consultation',
  documentType: 'PDF',
  isFree: false,
  requiresAccess: true,
  isUnlocked: false,
  previewAvailable: false,       // set true to allow free preview
  fileUrl: '/documents/consultation/my-paid-guide.pdf',
  previewUrl: '/documents/consultation/my-paid-guide.pdf',
  paymentLink: 'https://buy.stripe.com/YOUR_LINK_HERE',
  iconName: 'FileText'
}
```

## Available icon names

`BookOpen` · `CheckCircle2` · `Layers` · `ClipboardList` · `FileText` · `ShieldAlert`

## Connecting Stripe (when ready)

1. Create a Stripe Payment Link in your Stripe dashboard.
2. Paste the link into the `paymentLink` field of the paid resource in `src/products.ts`.
3. The "Unlock Access" button will automatically redirect clients to that link.
4. After payment, set `isUnlocked: true` for that resource (or connect a webhook to do it automatically).

## Granting access without payment (manual unlock)

Set `isUnlocked: true` on any resource entry to give instant access without a payment link.
This is useful for granting access to specific clients manually.
