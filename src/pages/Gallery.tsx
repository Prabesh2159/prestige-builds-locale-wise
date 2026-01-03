import { useState } from 'react';
import { galleryAlbums, GalleryAlbum } from '@/data/mockData';
import PageHero from '@/components/shared/PageHero';
import GalleryViewer from '@/components/gallery/GalleryViewer';

const Gallery = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);

  return (
    <div className="min-h-screen">
      <PageHero 
        title="Photo Gallery" 
        subtitle="Explore moments captured from our vibrant school life"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      {/* Gallery Grid - Album Cards */}
      <section className="section-padding bg-muted/30">
        <div className="container-school">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryAlbums.map((album, index) => (
              <div
                key={album.id}
                className="group relative overflow-hidden rounded-xl cursor-pointer animate-scale-in card-elevated hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedAlbum(album)}
              >
                {/* Cover Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay with Title */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent flex items-end">
                  <div className="p-5 w-full">
                    <h3 className="font-heading text-lg font-semibold text-white mb-2 drop-shadow-md">
                      {album.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="badge-new text-[10px] px-2 py-0.5">
                        {album.images.length} {album.images.length === 1 ? 'Photo' : 'Photos'}
                      </span>
                      <p className="text-white/70 text-xs">
                        {new Date(album.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-gold rounded-xl transition-colors duration-300" />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {galleryAlbums.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No galleries available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Viewer Modal */}
      {selectedAlbum && (
        <GalleryViewer
          images={selectedAlbum.images}
          title={selectedAlbum.title}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </div>
  );
};

export default Gallery;
