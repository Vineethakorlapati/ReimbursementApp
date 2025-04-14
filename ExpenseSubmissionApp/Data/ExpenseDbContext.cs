using Microsoft.EntityFrameworkCore;
using ReceiptApi.Models;

namespace ReceiptApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Receipt> Receipts => Set<Receipt>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Receipt>(entity =>
            {
                entity.Property(r => r.Amount)
                    .HasColumnType("decimal(18,2)");
                
                entity.Property(r => r.Status)
                    .HasDefaultValue("Pending")
                    .HasMaxLength(20);
                
                entity.Property(r => r.Description)
                    .HasMaxLength(500);
                
                entity.Property(r => r.FilePath)
                    .IsRequired()
                    .HasMaxLength(255);
            });
        }
    }
}