using Microsoft.EntityFrameworkCore;
using ExpenseSubmissionApp.Models;

namespace ExpenseSubmissionApp.Data
{
    public class ExpenseDbContext : DbContext
    {
        public ExpenseDbContext(DbContextOptions<ExpenseDbContext> options) : base(options)
        {
        }

        // table for reimbursements
        public DbSet<Reimbursement> Reimbursements => Set<Reimbursement>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reimbursement>(entity =>
            {
                // store money value with decimal
                entity.Property(x => x.Amount)
                      .HasColumnType("decimal(18,2)");

                // default status is 'Pending'
                entity.Property(x => x.Status)
                      .HasDefaultValue("Pending")
                      .HasMaxLength(20);

                // description should not be too long
                entity.Property(x => x.Description)
                      .HasMaxLength(500);

                // file path must be provided and limited in size
                entity.Property(x => x.FilePath)
                      .IsRequired()
                      .HasMaxLength(255);
            });
        }
    }
}
