namespace ExpenseSubmissionApp.Models
{
    // main model class for reimbursement
    public class Reimbursement
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }          // date of the purchase
        public decimal Amount { get; set; }         // total cost
        public string Description { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty; // saved file name
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Pending";
    }

    // model for creating new reimbursement
    public class ReimbursementCreateDto
    {
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; } = string.Empty;
        public required IFormFile File { get; set; } // file upload
    }

    // model for sending reimbursement data to frontend
    public class ReimbursementDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; } = string.Empty;
        public string FileUrl { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }

    // model to update only the status
    public class ReimbursementUpdateDto
    {
        public string? Status { get; set; }
    }
}
