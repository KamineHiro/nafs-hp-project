import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Features() {
  const t = useTranslations('home');
  const features = t.raw('features');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature: any, index: number) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-24 h-24 mb-6 relative">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 