using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using ExpenseSubmissionApp.Data;
using ExpenseSubmissionApp.Models;

var builder = WebApplication.CreateBuilder(args);

// adding db connection using sqlite
builder.Services.AddDbContext<ExpenseDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// adding controllers
builder.Services.AddControllers();

// CORS setup so frontend can call API without issues
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// swagger is used to test API in browser
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// show swagger only if in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// enable cors policy
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

// serving uploaded files like pdf or images from a folder
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.WebRootPath, "documents")), // folder name is documents
    RequestPath = "/documents", // use this path in browser to access files
    ContentTypeProvider = new FileExtensionContentTypeProvider
    {
        Mappings = {
            [".pdf"] = "application/pdf",
            [".jpg"] = "image/jpeg",
            [".jpeg"] = "image/jpeg",
            [".png"] = "image/png"
        }
    }
});

app.UseAuthorization();

// map controller routes
app.MapControllers();

// this creates db file if it doesn't exist already
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ExpenseDbContext>();
    db.Database.EnsureCreated();
}

// run the app
app.Run();
