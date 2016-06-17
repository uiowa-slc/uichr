<main class="main" role="main">
	<header class="page-header">
		<div class="container">
			<%-- <h1 class="page-title">$Title</h1> --%>
			<h1 class="page-title">
				<% if $ArchiveYear %>
					<%t Blog.Archive 'Archive' %>:
					<% if $ArchiveDay %>
						$ArchiveDate.Nice
					<% else_if $ArchiveMonth %>
						$ArchiveDate.format('F, Y')
					<% else %>
						$ArchiveDate.format('Y')
					<% end_if %>
				<% else_if $CurrentTag %>
					<%t Blog.Tag 'Tag' %>: $CurrentTag.Title
				<% else_if $CurrentCategory %>
					<%t Blog.Category 'Category' %>: $CurrentCategory.Title
				<% else %>
					$Title
				<% end_if %>
			</h1>
			<% if $ClassName != "HomePage" %>$Breadcrumbs<% end_if %>
			<% include HeaderPhoto %>
		</div>
	</header>
	<section class="container page-content">
		<div class="row">
			<!-- Main Content -->
			<h3 id="main-content" class="sr-only" tabindex="-1">Main Content</h3>
			<div class="col-lg-8 children">
				$Content
				$Form
				<!-- Loop News -->
				<div class="newsholder-entries">
					<% loop PaginatedList %>
						<% include NewsCard %>
					<% end_loop %>
				</div>
				<% with $PaginatedList %>
					<% include Pagination %>
				<% end_with %>
			</div><!-- end .col -->

			<!-- Side Bar -->
			<% include SideBar %>
		</div><!-- end .row -->
	</section>

</main><!-- end .container -->